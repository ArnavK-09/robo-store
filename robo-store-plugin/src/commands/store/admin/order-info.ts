// Imports required
import type { CommandConfig, CommandResult } from 'robo.js';
import { Order } from '../../../database';
import { type CommandInteraction } from 'discord.js';

// Command Config
export const config: CommandConfig = {
	description: 'Retrieve detailed information about a specific order.',
	options: [
		{
			name: 'order',
			description: 'The ID of the product to fetch information for.',
			type: 'string',
			required: true
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction): Promise<CommandResult> => {
	const orderId = interaction.options.get('order')!.value!.toString();
	const res = await Order.findById(orderId).exec();
	return `${res}`;
};
