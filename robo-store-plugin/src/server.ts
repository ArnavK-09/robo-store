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
	toNodeListener,
	readBody
} from 'h3';
import http from 'http';
import PluginOptions from '.';
import { options, pluginLogger } from './events/_start';
import DiscordOauth2 from 'discord-oauth2';
import { portal } from 'robo.js';
import { stat, readFile } from 'node:fs/promises';
import { join } from 'path';
import mongoose from 'mongoose';
import { Order, Product, ProductType } from './database';
import { Client, Snowflake } from 'discord.js';

// Sum of array
export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

// Discord Oauth
let oauth = new DiscordOauth2({});

// Discord Client
let client: Client;

// Plugin Options
let plugin_options: PluginOptions;

// Directory where frontend files are;
const FRONTEND_DIR = './.robo.store';

// Create an app instance
export const app = createApp({
	onError: (error) => {
		pluginLogger.debug(error);
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

// GET Callback @TODO
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
			scope: ['identify', 'email'],
			grantType: 'authorization_code',
			clientSecret: plugin_options.client_secret
		});

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
		try {
			const { id, global_name, username, email, verified } = await oauth.getUser(access_token!);
			return { id, global_name, username, email, verified };
		} catch {
			setResponseStatus(e, 401);
			return {
				message: 'Invalid Access Token'
			};
		}
	})
);

// GET /api/@me/avatar
me.get(
	'/avatar',
	defineEventHandler(async (e) => {
		const access_token = getCookie(e, 'access_token');
		checkAuth(e);
		const { avatar, id } = await oauth.getUser(access_token!);
		if (avatar) {
			return sendRedirect(e, `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048&dynamic=true`);
		} else {
			return sendRedirect(e, `/favicon.svg`);
		}
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

// GET /api/@me/orders
me.get(
	'/orders',
	defineEventHandler(async (e) => {
		checkAuth(e);
		const access_token = getCookie(e, 'access_token')!;
		const { id } = await oauth.getUser(access_token!);
		const orders = await Order.find({
			buyer: id
		});
		return orders;
	})
);

// POST /api/@me/order
me.post(
	'/order',
	defineEventHandler(async (e) => {
		checkAuth(e);
		const access_token = getCookie(e, 'access_token');
		const { id } = await oauth.getUser(access_token!);
		const body: { cart: Array<{ product: ProductType; quantity: number }> } = await readBody(e);

		if (!body.cart) {
			return {
				message: 'No Products Specified'
			};
		}

		let allProducts = await Promise.all(
			body.cart.map(async (x) => {
				const product = await Product.findById(x.product._id).exec();

				return product;
			})
		);

		allProducts = allProducts.filter((p) => !!p);

		let totalAmount = 0;
		let finalAmount = 0;
		totalAmount = sum(body.cart.map((x) => x.product.price * x.quantity));
		finalAmount = sum(
			body.cart.map((x) => Math.round(x.product.price - (x.product.discount * x.product.price) / 100) * x.quantity)
		);
		const newOrder = new Order({
			buyer: id,
			products: allProducts.map((x) => ({
				product: x!._id,
				quantity: body.cart.filter((c) => c.product._id.toString() == x!._id.toString())[0].quantity as Number
			})),
			totalAmount,
			finalAmount
		});
		const order = await newOrder.save();
		notifyOwnerOfNewOrder(order.id, client).catch(pluginLogger.error);
		return order;
	})
);

/**
 * Function to start server
 */
export async function initPlugin(options: PluginOptions, discord_client: Client) {
	pluginLogger.debug(options);

	// Discord Oauth
	oauth = new DiscordOauth2({
		redirectUri: `https://${options.domain}/api/callback`,
		clientId: options.client_id,
		clientSecret: options.client_secret
	});

	// Discord Client
	client = discord_client;

	// Plugin Options
	plugin_options = options;

	// Connect To Database
	await mongoose
		.connect(options.mongo_uri!)
		.then(() => pluginLogger.ready('Connected to Database!'))
		.catch((e) => pluginLogger.error(e.message));

	// Start Server
	const server = http.createServer(toNodeListener(app));
	server.listen(options.port!);
	pluginLogger.ready(`Storefront accessible at:- https://localhost:${options.port!}`);
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

/**
 * Notifying Utils
 */

async function notifyOwnerOfNewOrder(order_id: string, discord_client: Client) {
	const res = await Order.findById(order_id).exec();
	const owner = await discord_client.users.fetch(plugin_options.owner_id as Snowflake);

	if (!res) {
		owner.send({
			content: `❌ **Faied to fetch information about newly created order with ID** '${order_id}'`
		});
		return;
	}
	let allProducts = await Promise.all(
		res.products.map(async (x: any) => {
			const product = await Product.findById(x.product._id).exec();
			return { product, quantity: x.quantity };
		})
	);
	allProducts = allProducts.filter(Boolean);
	owner.send({
		content: `📦 **New Order RECIEVED:**\n\n**Order ID:** \`${res.primary_id}\`\n**Buyer:** \`${res.buyer}\` | <@${res.buyer}>\n**Payment Status:** \`${res.payment_done ? 'Completed' : 'Pending'}\`\n**Total Amount:** \`${res.totalAmount}\`\n**Status:** \`${res.status}\`\n**Ordered At:** \`${res.orderedAt.toLocaleString()}\`\n**Products:**${allProducts.map((x) => `\n- Name: \` ${x.product?.title} \` | Qty:- \` ${x.quantity} \` | ProductID:- \` ${x.product?._id} \` `)}`
	});
}
