// Imports required
import type { CommandConfig } from 'robo.js';
import { Order } from '../../database';
import { ChatInputCommandInteraction } from 'discord.js';

// Command Config
export const config: CommandConfig = {
	description: 'Display a list of all your orders.'
};

// Command Execution
export default async (interaction: ChatInputCommandInteraction) => {
	const allOrders = await Order.find({ buyer: interaction.user.id }).exec();
	if (!(allOrders.length > 0)) return 'You have placed no orders';
	return `${allOrders}`;
};
