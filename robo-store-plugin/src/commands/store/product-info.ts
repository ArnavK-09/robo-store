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
	const res = await Product.findById(productId).exec();
	if(!res) return `❌ **No product found with ID**`;
	else return {
		embeds: [genProductEmbed({
			...res.toObject(),  
			_id: res._id.toString()  
		  } as ProductType)],
		components: [
			new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setURL(`https://${options.domain}/store/${res?._id}`)
					.setLabel('Visit Product On Website')
					.setStyle(ButtonStyle.Link)
			)
		]
	};
};

// Listing Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('product')?.value?.toString() ?? '';
	const listOfProducts = await Product.find().$where(`this.title.includes('${query}')`).exec();
	return listOfProducts.map((x) => ({ name: x.title, value: x._id }));
};
