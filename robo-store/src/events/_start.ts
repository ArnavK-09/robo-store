import { logger } from 'robo.js'
import { initPlugin } from '../server';
import { Client } from 'discord.js';
import mongoose from 'mongoose';


export interface PluginOptions {
	mongo_uri: string;
	owner_id: string;
	store_name: string;
	categories: string[];
	domain: string;
}

export let options: PluginOptions;

export const pluginLogger = logger.fork('robo-store')

export default async (_client: Client, pluginOptions: PluginOptions) => {
	options = pluginOptions;
	console.log(options ?? 564);
	const res = await mongoose.connect(options.mongo_uri);
	pluginLogger.event('Initializing processes...')
	await initPlugin().catch((err) => {
		pluginLogger.error(err)
	})
}