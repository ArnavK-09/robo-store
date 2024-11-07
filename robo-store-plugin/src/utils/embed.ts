// Imports required
import { EmbedBuilder } from 'discord.js';
import { OrderType, ProductType } from '../database';
import { options } from '../events/_start';

// Generating Product Embed for Preview in Discord Chat
export const genProductEmbed = (product: ProductType): EmbedBuilder => {
	return new EmbedBuilder()
		.setColor('#5865F2')
		.setTitle(product.title)
		.setURL(`https://${options.domain}`)
		.setAuthor({ name: product.stockout ? 'Product Not Available :(' : 'Product Available :)' })
		.setDescription(product.description ?? 'No product description available.')
		.addFields(
			{ name: 'Price', value: `$${product.price.toFixed(2)}`, inline: true },
			{ name: 'Discount', value: `${product.discount}%`, inline: true },
			{ name: 'Category', value: product.category ?? 'Uncategorized', inline: true }
		)
		.setImage(product.image)
		.setFooter({ text: `Created On: ${product.createdAt.toDateString()}` });
};

// Generating Order Embed for Preview in Discord Chat
// @notused
export const genOrderEmbed = (order: OrderType): EmbedBuilder => {
	return new EmbedBuilder()
		.setColor('#F24E1E')
		.setTitle(`Order ID: ${order.primary_id}`)
		.setAuthor({ name: `Buyer: ${order.buyer}` })
		.setDescription(`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)
		.addFields(
			{ name: 'Total Amount', value: `$${order.totalAmount.toFixed(2)}`, inline: true },
			{ name: 'Payment Status', value: order.payment_done ? '✅ Completed' : '❌ Pending', inline: true },
			{ name: 'Ordered At', value: order.orderedAt.toDateString(), inline: true },
			{ name: 'Products', value: `${order.products}`, inline: true }
		)
		.setFooter({ text: `Order Date: ${order.orderedAt.toLocaleString()}` });
};
