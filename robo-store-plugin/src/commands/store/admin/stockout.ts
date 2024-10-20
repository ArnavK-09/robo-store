// Imports required
import type { CommandConfig } from 'robo.js';
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js';
import { Product } from '../../../database';

// Command Config
export const config: CommandConfig = {
	description: 'Mark a product as out of stock or back in stock.',
	options: [
		{
			name: 'product',
			description: 'The name of the product to update.',
			type: 'string',
			autocomplete: true,
			required: true
		},
		{
			name: 'stock_out',
			description: 'Indicate if the product is out of stock.',
			type: 'string',
			required: true,
			choices: [
				{
					name: 'True',
					value: 'true'
				},
				{
					name: 'False',
					value: 'false'
				}
			]
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction) => {
	const productId = interaction.options.get('product')!.value!.toString();
	const stockOut = interaction.options.get('stock_out')?.value?.toString() ?? 'true';
	const res = await Product.updateOne({ _id: productId }, { stockout: stockOut == 'true' }).exec();
	return `${res.acknowledged} Updated!`;
};

// Lisiting Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('product')?.value?.toString() ?? '';
	const listOfProducts = await Product.find().exec();
	return listOfProducts.filter((x) => x.title.includes(query)).map((x) => ({ name: x.title, value: x._id }));
};
