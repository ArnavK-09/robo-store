// Imports required
import type { CommandConfig } from 'robo.js';
import { Product, ProductType } from '../../database';
import { genProductEmbed } from '../../utils/embed';

// Command Config
export const config: CommandConfig = {
	description: 'Display a list of all available products.'
};

// Listing Products
export default async () => {
	const allProducts = await Product.find().catch(() => null);
	if (!allProducts || allProducts.length == 0) return `😟 There are no products available in the store at the moment.`;
	else
		return {
			embeds: allProducts.map((x) => genProductEmbed(x as any))
		};
};
