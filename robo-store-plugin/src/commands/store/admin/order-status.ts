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
	return `✅ **Order with ID** '${orderId}' **has been updated to** '${newStatus}'`;
};

// Lisiting Orders
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('order')?.value?.toString() ?? '';
	const listOfProducts = await Order.find().exec();
	return listOfProducts.filter((x) => x.primary_id.includes(query)).map((x) => ({ name: x.primary_id, value: x._id }));
};
