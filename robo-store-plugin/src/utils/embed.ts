// Imports required
import { EmbedBuilder } from 'discord.js';
import { ProductType } from '../database';
import { options } from '../events/_start';

// Generating Product Embed for Preview in Discord Chat
export const genProductEmbed = (product: ProductType): EmbedBuilder => {
	return new EmbedBuilder()
		.setColor('#5865F2')
		.setTitle(product.title)
		.setURL(`https://${options.domain}`)
		.setAuthor({ name: product.stockout ? 'Product stock not available :(' : 'Product stock available :)' })
		.setDescription(product.description ?? 'No product description....')
		.addFields({ name: 'Product Price', value: `${product.price}`, inline: true })
		.addFields({ name: 'Current Discord', value: `${product.discount}`, inline: true })
		.setImage(product.image)
		.setFooter({ text: `Created On:- ${product.createdAt.toDateString()}` });
};
