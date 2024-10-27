// Imports required
import type { CommandConfig } from 'robo.js';
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js';
import { Product } from '../../../database';

// Command Config
export const config: CommandConfig = {
	description: 'Apply a discount to the selected product.',
	options: [
		{
			name: 'product',
			description: 'The name of the product to update.',
			type: 'string',
			autocomplete: true,
			required: true
		},
		{
			name: 'discount',
			description: 'The discount percentage to apply (0-99).',
			type: 'number',
			min: 0,
			max: 99,
			required: true
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction) => {
	const productId = interaction.options.get('product')!.value!.toString();
	const discount = interaction.options.get('discount')?.value;
	await Product.updateOne({ _id: productId }, { discount: discount }).exec();
	return `✅ **Successfully applied a discount of** \`${discount}%\` **to the selected product!**`;
};

// Lisiting Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('product')?.value?.toString() ?? '';
	const listOfProducts = await Product.find().exec();
	return listOfProducts.filter((x) => x.title.includes(query)).map((x) => ({ name: x.title, value: x._id }));
};
