// Imports required
import type { CommandConfig, CommandOptions } from 'robo.js';
import type { CommandInteraction } from 'discord.js';
import { Product } from '../../../database';
import { options as pluginOptions } from '../../../events/_start';

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
			type: 'string',
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
	let img_url: string = interaction.options.get('image')?.value as string;

	try {
		img_url = new URL(img_url).href;
	} catch {}

	if (pluginOptions?.imgbb_api_key) {
		try {
			const res = await fetch(`https://api.imgbb.com/1/upload?key=${pluginOptions.imgbb_api_key}&image=${img_url}`, {
				method: 'POST'
			});
			if (res.ok) {
				const data = (await res.json()) as { display_url?: string };
				if (data.display_url) {
					img_url = decodeURIComponent(data.display_url);
				}
			}
		} catch {}
	}

	const newProduct = new Product({
		title: options.title,
		description: options.description,
		category: options.category,
		price: options.price,
		image: img_url
	});
	const res = await newProduct.save();
	return `✅ **Product** \` ${res.title} \` **saved!**\n\n**Details:**\n- **Description:** \` ${res.description} \`\n- **Category:** \` ${res.category} \`\n- **Price:** \` ${res.price} \`\n- **Image URL:** ${res.image}`;
};
