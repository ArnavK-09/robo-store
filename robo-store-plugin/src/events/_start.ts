// Imports required
import { logger } from 'robo.js';
import { initPlugin } from '../server';
import { Client } from 'discord.js';
import PluginOptions from '..';

export let options: PluginOptions;

// Plugin specific logger
export const pluginLogger = logger.fork('robo-store');

// Intializing Plugin
export default async (client: Client, pluginOptions: PluginOptions) => {
	// Default Store Options
	pluginOptions.introduction ??=
		"Exclusive products available only for our private community! Join our Discord to access special deals, limited drops, and insider perks. Fast shipping and secure checkout for members only. Don't miss out!";
	pluginOptions.store_name ??= 'Store';
	pluginOptions.about_us ??=
		"Welcome to our exclusive store, where premium products meet a close-knit community. We're not just any shop—our offerings are available only to those who join our private Discord server. As part of our community, you'll get early access to limited-edition items, special discounts, and insider perks. We're all about creating a seamless, personalized shopping experience with fast shipping, secure payments, and top-notch support. Connect with like-minded individuals, discover unique products, and enjoy a shopping experience built around you. Join us on Discord and become part of something special!";
	pluginOptions.slogan ??= 'Grab The Products Now...';
	pluginOptions.invite ??= `https://discord.com/users/${pluginOptions.owner_id}`;
	pluginOptions.client_id ??= process.env.DISCORD_CLIENT_ID;
	pluginOptions.mongo_uri ??= process.env.MONGO_URI;
	pluginOptions.currency_symbol ??= '$';
	pluginOptions.port ??= 3000;

	// Assigning Options
	options = pluginOptions;
	pluginLogger.debug('Plugin Specified Options:- ' + JSON.stringify(options));

	// Starting mongo server & plugin
	pluginLogger.event('Initializing processes...');
	await initPlugin(options, client).catch((err) => {
		pluginLogger.error(err);
	});
};
