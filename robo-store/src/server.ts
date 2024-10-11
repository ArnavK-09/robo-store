/**
 * Imports required
 */
import { createApp, createRouter, defineEventHandler, deleteCookie, fromNodeMiddleware, getCookie, getQuery, handleCors, sendRedirect, serveStatic, setCookie, setResponseHeader, setResponseStatus, toNodeListener, useBase, useSession } from "h3";
import http from "http";
import { pluginLogger } from "./events/_start";
import DiscordOauth2, { TokenRequestResult } from 'discord-oauth2';
import Portal from "robo.js/dist/core/portal";
import { portal } from "robo.js";
import { stat, readFile } from "node:fs/promises";
import { join } from "path";

// Discord Oauth 
const oauth = new DiscordOauth2({
    redirectUri: "https://musical-space-dollop-g66jw4j4vw6h9wrw-3000.app.github.dev/api/callback",
});

/**
 * Type interface for robo.js bot structure
 */
interface RoboData extends Portal { };

// All Robo.js bot data fetched here
const RoboDatabase: RoboData = portal;

// Directory where frontend files are 
const FRONTEND_DIR = "./.robo.store"

// Create an app instance
export const app = createApp({
    onError: (error) => {
        pluginLogger.error(error);
    }
});


// Cors Err 
app.use('/',
    defineEventHandler(async (event) => {
        const didHandleCors = handleCors(event, {
            origin: '*',
            preflight: {
                statusCode: 204,
            },
            methods: '*',
        });
        if (didHandleCors) {
            return;
        }
    })
);

/**
 * Serving frontend
 */
app.use(
    "/",
    defineEventHandler((event) => {
        return serveStatic(event, {
            getContents: (id) => readFile(join(FRONTEND_DIR, id)),
            getMeta: async (id) => {
                const stats = await stat(join(FRONTEND_DIR, id)).catch(() => { });

                if (!stats || !stats.isFile()) {
                    return;
                }

                const MimeTypes: any = {
                    "html": "text/html",
                    "css": "text/css",
                    "js": "text/javascript"
                }

                return {
                    type: MimeTypes[id.split(".")[id.split(".").length - 1]] ?? "",
                    size: stats.size,
                    mtime: stats.mtimeMs,
                };
            },
        });
    }), {
    match: (url) => {
        return !url.startsWith('/api');
    },
},
);

/**
 * API Router
 */
const api = createRouter();
app.use("/api", api.handler);

// GET /api 
api.get(
    "/",
    defineEventHandler((e) => {
        return {
            message: 'Hello, API!',
            time: new Date().toLocaleString(),
            data: RoboDatabase
        };
    }),
);

// GET /login 
api.get("/login", defineEventHandler((e) => {
    const url = oauth.generateAuthUrl({
        scope: ["identify", "email"],
    });

    return sendRedirect(e, url);
}))

// GET Callback 
api.get("/callback", defineEventHandler(async (e) => {
    const query = getQuery(e);
    const code = query.code;
    if (!code) {
        setResponseStatus(e, 500);
        return {
            message: 'Invalid Oauth Params'
        }
    }

    const data = await oauth.tokenRequest({
        code: code.toString(),
        scope: "identify email",
        grantType: "authorization_code",
    })

    console.log(data)

    setCookie(e, "access_token", data.access_token, { secure: true, maxAge: data.expires_in });
    setCookie(e, "refresh_token", data.refresh_token, { secure: true, maxAge: data.expires_in });

    return sendRedirect(e, "/");
}))

/**
 * Discord profile Router
*/
const me = createRouter();
app.use("/api/@me", me.handler);

// GET /api/@me 
me.get(
    "/",
    defineEventHandler(async (e) => {
        // getting cookies 
        const access_token = getCookie(e, "access_token");

        if (!access_token) {
            setResponseStatus(e, 401);
            return {
                message: 'Unauthorized'
            }
        }

        const user = await oauth.getUser(access_token);
        return user;
    }),
);


// GET /api/@me/logout 
me.get(
    "/logout",
    defineEventHandler(async (e) => {
        // getting cookies 
        const access_token = getCookie(e, "access_token");

        if (!access_token) {
            setResponseStatus(e, 401);
            return {
                message: 'Unauthorized'
            }
        }


        deleteCookie(e, "access_token");
        deleteCookie(e, "refresh_token");


       await oauth.revokeToken(access_token);
       return sendRedirect(e, "/");
    }),
);

/**
 * Function to start server
 */
export async function initPlugin() {
    const server = http.createServer(toNodeListener(app));
    server.listen(3000)
}