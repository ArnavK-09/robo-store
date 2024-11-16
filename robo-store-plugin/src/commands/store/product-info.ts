// Imports required
import type { CommandConfig, CommandResult } from 'robo.js';
import { Product, ProductType } from '../../database';
import {
	type CommandInteraction,
	type AutocompleteInteraction,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} from 'discord.js';
import { genProductEmbed } from '../../utils/embed';
import { options } from '../../events/_start';

// Command Config
export const config: CommandConfig = {
	description: 'Retrieve detailed information about a specific product.',
	options: [
		{
			name: 'product',
			description: 'The name of the product to fetch information for.',
			type: 'string',
			autocomplete: true,
			required: true
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction): Promise<CommandResult> => {
	const productId = interaction.options.get('product')!.value!.toString();
	const res = await Product.findById(productId)
		.exec()
		.catch(() => null);
	if (!res) return `❌ **No product found with ID**`;
	else
		return {
			embeds: [
				genProductEmbed({
					...res.toObject(),
					_id: res._id.toString()
				} as ProductType)
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Visit Product On Website')
						.setURL(new URL(`/store/${res?._id}`, options.domain).href)
						.setStyle(ButtonStyle.Link)
				)
			]
		};
};

// Listing Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('product')?.value?.toString() ?? '';
	const listOfProducts = await Product.find().exec();
	return listOfProducts
		.filter((x) => x.title.includes(query.trim()))
		.map((x) => ({ name: x.title, value: x._id }))
		.slice(0, 24);
};
