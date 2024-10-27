// Imports required
import type { CommandConfig, CommandOptions } from 'robo.js';
import type { CommandInteraction } from 'discord.js';
import { Product } from '../../../database';
import { options } from '../../../events/_start';

// Command Config
export const config: CommandConfig = {
	description: 'Add a new product to the store.',
	options: [
		{
			name: 'title',
			description: 'The product title.',
			type: 'string',
			required: true
		},
		{
			name: 'description',
			description: 'A brief description of the product.',
			type: 'string'
		},
		{
			name: 'price',
			description: 'The price of the product.',
			type: 'number',
			required: true
		},
		{
			name: 'image',
			description: 'An image of the product.',
			type: 'attachment',
			required: true
		},
		{
			name: 'category',
			description: 'The product category.',
			type: 'string'
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction, options: CommandOptions<typeof config>) => {
	const newProduct = new Product({
		title: options.title,
		description: options.description,
		category: options.category,
		price: options.price,
		// @ts-expect-error TODO to fi this type issue
		image: options.image!.url?.toString()
	});
	const res = await newProduct.save();
	return `✅ **Product** '${res.title}' **saved!**\n\n**Details:**\n- **Description:** '${res.description}'\n- **Category:** '${res.category}'\n- **Price:** '${res.price}'\n- **Image URL:** '${res.image}'`;
};
