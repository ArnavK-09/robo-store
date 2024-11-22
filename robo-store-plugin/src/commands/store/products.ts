// Imports required
import type { CommandConfig } from 'robo.js';
import { Product, ProductType } from '../../database';
import { genProductEmbed } from '../../utils/embed';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, CommandInteraction } from 'discord.js';

const PRODUCTS_PER_PAGE = 1;
const NAMESPACE = '__robo.js__store';

export const config: CommandConfig = {
	description: 'Display a list of all available products with pagination.'
};

export default async (interaction: CommandInteraction) => {
	const allProducts = await Product.find().catch(() => null);
	if (!allProducts || allProducts.length === 0) {
		await interaction.reply(`😟 There are no products available in the store at the moment.`);
		return;
	}

	const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
	const page = 0;

	await interaction.reply({
		embeds: [createEmbed(allProducts as unknown as ProductType[], page, totalPages)],
		components: totalPages > 1 ? [createPaginationButtons(page, totalPages, interaction.user.id)] : []
	});
};

function createEmbed(products: ProductType[], page: number, totalPages: number) {
	const start = page * PRODUCTS_PER_PAGE;
	const end = start + PRODUCTS_PER_PAGE;
	const pageProduct = products.slice(start, end)[0];

	return genProductEmbed(pageProduct);
}

function createPaginationButtons(page: number, totalPages: number, userId: string) {
	return new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId(`${NAMESPACE}@previous@${page}@${userId}`)
			.setEmoji('⏪')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(page === 0),
		new ButtonBuilder()
			.setCustomId(`${NAMESPACE}@next@${page}@${userId}`)
			.setEmoji('⏭')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(page === totalPages - 1)
	);
}

// Button Interaction Handler
export async function handleProductPagination(interaction: ButtonInteraction) {
	if (!interaction.isButton()) return;

	const [namespace, action, pageNo, userId] = interaction.customId.split('@');
	if (namespace !== NAMESPACE || userId !== interaction.user.id) {
		await interaction.reply({ ephemeral: true, content: '🔴 You cannot interact with this menu.' });
		return;
	}

	const allProducts = await Product.find().catch(() => null);
	if (!allProducts) {
		await interaction.reply({
			ephemeral: true,
			content: '😟 There are no products available in the store at the moment.'
		});
		return;
	}

	let page = parseInt(pageNo, 10);
	const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

	if (action === 'previous' && page > 0) {
		page--;
	} else if (action === 'next' && page < totalPages - 1) {
		page++;
	}

	await interaction.update({
		embeds: [createEmbed(allProducts as unknown as ProductType[], page, totalPages)],
		components: [createPaginationButtons(page, totalPages, interaction.user.id)]
	});
}
