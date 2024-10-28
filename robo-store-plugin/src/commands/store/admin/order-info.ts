// Imports required
import type { CommandConfig, CommandResult } from 'robo.js';
import { Order, Product } from '../../../database';
import { AutocompleteInteraction, type CommandInteraction } from 'discord.js';

// Command Config
export const config: CommandConfig = {
	description: 'Retrieve detailed information about a specific order.',
	options: [
		{
			name: 'order',
			description: 'The ID of the product to fetch information for.',
			type: 'string',
			required: true,
			autocomplete: true
		}
	]
};

// Command Execution
export default async (interaction: CommandInteraction): Promise<CommandResult> => {
	const orderId = interaction.options.get('order')!.value!.toString();
	const res = await Order.findById(orderId).exec();
	if (!res) return `❌ **No order found with ID** '${orderId}'`;

	let allProducts = await Promise.all(
		res.products.map(async (x) => {
			const product = await Product.findById(x.product._id).exec();

			return product;
		})
	);

	allProducts = allProducts.filter((p) => !!p);

	return `📦 **Order Details:**\n\n**Order ID:** '${res.primary_id}'\n**Buyer:** '${res.buyer}'\n**Payment Status:** '${res.payment_done ? 'Completed' : 'Pending'}'\n**Total Amount:** '${res.totalAmount}'\n**Status:** '${res.status}'\n**Ordered At:** '${res.orderedAt.toLocaleString()}'\n**Product ID:** '${allProducts}'`;
};

// Lisiting Orders
export const autocomplete = async (interaction: AutocompleteInteraction) => {
	const query = interaction.options.get('order')?.value?.toString() ?? '';
	const listOfProducts = await Order.find().exec();
	return listOfProducts.filter((x) => x.primary_id.includes(query)).map((x) => ({ name: x.primary_id, value: x._id }));
};
