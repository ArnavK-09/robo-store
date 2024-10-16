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
	const allProducts = await Product.find();
	return {
		embeds: allProducts.map((x) => genProductEmbed(x as ProductType))
	};
};
