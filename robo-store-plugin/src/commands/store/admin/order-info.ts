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
	if (res) {
		return `📦 **Order Details:**\n\n**Order ID:** '${res.primary_id}'\n**Buyer:** '${res.buyer}'\n**Payment Status:** '${res.payment_done ? "Completed" : "Pending"}'\n**Total Amount:** '${res.totalAmount}'\n**Status:** '${res.status}'\n**Ordered At:** '${res.orderedAt.toLocaleString()}'\n**Product ID:** '${res.product}'`;
	} else {
		return `❌ **No order found with ID** '${orderId}'`
	}
};
