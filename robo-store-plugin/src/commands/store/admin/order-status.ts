// Imports
import type { CommandConfig, CommandResult } from 'robo.js';
import { Order } from '../../../database';
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js';

// Command Config
export const config: CommandConfig = {
	description: 'Update the status of an existing order.',
	options: [
		{
			name: 'order',
			description: 'The ID of the order to update.',
			type: 'string',
			autocomplete: true,
			required: true
		},
		{
			name: 'status',
			description: 'The new status to apply to the order.',
			required: true,
			type: 'string',
			choices: ['pending', 'shipped', 'delivered', 'canceled'].map((x) => ({ name: x, value: x }))
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction): Promise<CommandResult> => {
	const orderId = interaction.options.get('order')!.value!.toString();
	const newStatus = interaction.options.get('status')!.value!.toString();
	const res = await Order.updateOne({ _id: orderId }, { status: newStatus }).exec();
	return `${res} Updated`;
};

// Lisiting Products
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('order')?.value?.toString() ?? '';
	const listOfProducts = await Order.find().$where(`this._id.includes('${query}')`).exec();
	return listOfProducts.map((x) => ({ value: x._id }));
};
