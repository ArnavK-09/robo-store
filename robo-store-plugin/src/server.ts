// Imports required
import {
	createApp,
	createRouter,
	defineEventHandler,
	deleteCookie,
	EventHandlerRequest,
	getCookie,
	getQuery,
	getRouterParam,
	H3Event,
	sendRedirect,
	serveStatic,
	setCookie,
	setResponseStatus,
	toNodeListener
} from 'h3';
import http from 'http';
import { options, pluginLogger, PluginOptions } from './events/_start';
import DiscordOauth2 from 'discord-oauth2';
import { portal } from 'robo.js';
import { stat, readFile } from 'node:fs/promises';
import { join } from 'path';
import mongoose from 'mongoose';
import { Product } from './database';

// Discord Oauth
let oauth = new DiscordOauth2({});

// Directory where frontend files are;
const FRONTEND_DIR = './.robo.store';

// Create an app instance
export const app = createApp({
	onError: (error) => {
		pluginLogger.error(error);
	}
});

/**
 * Serving frontend
 */
app.use(
	'/',
	defineEventHandler((event) => {
		return serveStatic(event, {
			getContents: (id) => readFile(join(FRONTEND_DIR, id)),
			getMeta: async (id) => {
				const stats = await stat(join(FRONTEND_DIR, id)).catch(() => {});

				if (!stats || !stats.isFile()) {
					return;
				}

				const MimeTypes: Record<string, string> = {
					html: 'text/html',
					css: 'text/css',
					js: 'text/javascript'
				};

				return {
					type: MimeTypes[id.split('.')[id.split('.').length - 1]] ?? '',
					size: stats.size,
					mtime: stats.mtimeMs
				};
			}
		});
	}),
	{
		match: (url) => {
			return !url.startsWith('/api');
		}
	}
);

/**
 * API Router
 */
const api = createRouter();
app.use('/api', api.handler);

// GET /api
api.get(
	'/',
	defineEventHandler(() => {
		return {
			message: 'Hello, API!',
			time: new Date().toLocaleString(),
			data: portal
		};
	})
);

// GET /login
api.get(
	'/login',
	defineEventHandler((e) => {
		const url = oauth.generateAuthUrl({
			scope: ['identify', 'email']
		});

		return sendRedirect(e, url);
	})
);

// GET Callback
api.get(
	'/callback',
	defineEventHandler(async (e) => {
		const query = getQuery(e);
		const code = query.code;
		if (!code) {
			setResponseStatus(e, 500);
			return {
				message: 'Invalid Oauth Params'
			};
		}

		const data = await oauth.tokenRequest({
			code: code.toString(),
			scope: 'identify email',
			grantType: 'authorization_code'
		});

		console.log(data);

		setCookie(e, 'access_token', data.access_token, { secure: true, maxAge: data.expires_in });
		setCookie(e, 'refresh_token', data.refresh_token, { secure: true, maxAge: data.expires_in });

		return sendRedirect(e, '/');
	})
);

/**
 * Store Router
 */
const store = createRouter();
app.use('/api/store', store.handler);

// GET /api/store
store.get(
	'/',
	defineEventHandler(async () => {
		const { mongo_uri, client_secret, ...data }: any = options; // eslint-disable-line
		data.categories = ((await Product.distinct('category').exec()) ?? []) as string[];
		return data;
	})
);

// GET /api/store/products
store.get(
	'/products',
	defineEventHandler(async () => {
		const allProducts = await Product.find();
		return allProducts;
	})
);

// GET /api/store/categories
store.get(
	'/categories',
	defineEventHandler(async () => {
		const allCategories = await Product.distinct('category').exec();
		return allCategories;
	})
);

// GET /api/store/products/:id
store.get(
	'/products/:id',
	defineEventHandler(async (e) => {
		const id = getRouterParam(e, 'id');
		const product = await Product.findOne({ _id: id })
			.exec()
			.catch(() => null);
		if (!product) {
			setResponseStatus(e, 404);
			return {
				message: 'Product not found'
			};
		}
		return product;
	})
);

/**
 * Discord profile Router
 */
const me = createRouter();
app.use('/api/@me', me.handler);

// GET /api/@me
me.get(
	'/',
	defineEventHandler(async (e) => {
		const access_token = getCookie(e, 'access_token');
		checkAuth(e);
		const user = await oauth.getUser(access_token!);
		return user;
	})
);

// GET /api/@me/logout
me.get(
	'/logout',
	defineEventHandler(async (e) => {
		const access_token = getCookie(e, 'access_token')!;
		deleteCookie(e, 'access_token');
		deleteCookie(e, 'refresh_token');
		if (access_token) await oauth.revokeToken(access_token);
		return sendRedirect(e, '/');
	})
);

/**
 * Function to start server
 */
export async function initPlugin(options: PluginOptions) {
	// Discord Oauth
	oauth = new DiscordOauth2({
		redirectUri: `https://${options.domain}/api/callback`,
		clientId: options.client_id,
		clientSecret: options.client_secret
	});

	// Connect To Database
	await mongoose
		.connect(options.mongo_uri)
		.then(() => pluginLogger.ready('Connected to Database!'))
		.catch((e) => pluginLogger.error(e.message));

	// Start Server
	const server = http.createServer(toNodeListener(app));
	server.listen(3000);
}

/**
 * Utilities
 */
function checkAuth(e: H3Event<EventHandlerRequest>) {
	const access_token = getCookie(e, 'access_token');
	if (!access_token) {
		setResponseStatus(e, 401);
		return {
			message: 'Unauthorized'
		};
	}
}
