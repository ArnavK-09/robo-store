// Imports required
import express from 'express'
import path from 'path'
import type Portal from 'robo.js/dist/core/portal'
import { createServer as createViteServer } from 'vite'
import { portal } from 'robo.js'
import { pluginLogger } from './events/_start';
import DiscordOauth2, { TokenRequestResult } from 'discord-oauth2';
import cookieParser from "cookie-parser";

// Discord Oauth 
const oauth = new DiscordOauth2({
	clientId: "",
	clientSecret: "-",
	redirectUri: "https://musical-space-dollop-g66jw4j4vw6h9wrw-3000.app.github.dev/api/callback",
});

// Express app for frontend and backend
const app = express()
const port = 3000

/**
 * Type interface for robo.js bot structure
 */
interface RoboData extends Portal { }

// All Robo.js bot data fetched here
const RoboDatabase: RoboData = portal

/**
 * Backend works
 */
const api = express.Router();


api.get('/', (req, res) => {
	res.json({
		message: 'Hello, World!',
		time: new Date().toLocaleString(),
		data: RoboDatabase
	})
})

api.get('/login', (_, res) => {
	const url = oauth.generateAuthUrl({
		scope: ["identify", "email"],
	});

	res.redirect(url);
})

api.get('/callback', async (req, res) => {
	const code = req.query.code;
	if (!code) {
		res.status(500).json({
			message: 'Invalid Oauth Params'
		})
		return
	}

	const data = await oauth.tokenRequest({
		code: code.toString(),
		scope: "identify email",
		grantType: "authorization_code",
	})

	res.cookie("access_token", data.access_token, { secure: true, maxAge: data.expires_in });
	res.cookie("refresh_token", data.refresh_token, { secure: true, maxAge: data.expires_in });
	res.redirect("/");

})

api.get('*', (_, res) => {
	res.status(404).json({
		message: 'API route not found'
	})
})

/**
 * Frontend works
 */
export async function initPlugin() {
	// Initializing vite server
	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom',
		root: path.resolve(import.meta.url, 'app')
	})

	// Use Vite's middleware for development
	app.use(vite.middlewares)

	// Middleware to parse cookies
	app.use(cookieParser());

	// Backend routes 
	app.use('/api', api);

	// Serving Built App
	app.use(express.static(path.resolve('./.robo.store')))


	// 404 Handler
	app.use('*', (_, res) => {
		res.status(404).json({
			message: 'this route not available'
		})
	})
// Error Handler 
app.use((err: Error, req: any, res: any, next: any) => {
	pluginLogger.error(err)
	res.status(500).json({ message: err.message.toString().trim().length == 0 ? 'Server Error!' : err.message })
})
	// Starting server
	app.listen(port, () => {
		pluginLogger.ready(`Server running at http://localhost:${port}`)
	})
}