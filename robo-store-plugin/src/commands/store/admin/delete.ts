// Imports
import type { CommandConfig, CommandResult } from 'robo.js';
import { Product } from '../../../database';
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js';

// Command Config
export const config: CommandConfig = {
	description: 'Remove a product from the store permanently.',
	options: [
		{
			name: 'product',
			description: 'The name of the product to delete.',
			type: 'string',
			autocomplete: true,
			required: true
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction): Promise<CommandResult> => {
	const productId = interaction.options.get('product')!.value!.toString();
	await Product.deleteOne({ _id: productId }).exec();
	return `🗑️ **Deleted product with ID** \` ${productId} \``;
};

// Lisiting Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('product')?.value?.toString() ?? '';
	const listOfProducts = await Product.find().exec();
	return listOfProducts
		.filter((x) => x.title.includes(query))
		.map((x) => ({ name: x.title, value: x._id }))
		.slice(0, 24);
};
