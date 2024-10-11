import type { CommandConfig, CommandResult } from 'robo.js'
import { Product, ProductType } from '../../database'
import { Pagination } from 'pagination.djs';
import { ChatInputCommandInteraction } from 'discord.js';
import { genProductEmbed } from '../../utils/embed';
export const config: CommandConfig = {
    description: 'List all products'
}

export default async (interaction: ChatInputCommandInteraction) => {
    const allProducts = await Product.find();
    
    return {
        embeds: allProducts.map(x => genProductEmbed(x as ProductType))
    }
}