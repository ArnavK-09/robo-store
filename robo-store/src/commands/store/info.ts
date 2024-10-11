import type { CommandConfig, CommandResult } from 'robo.js'
import { Product, ProductType } from '../../database'
import { type CommandInteraction, type AutocompleteInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { genProductEmbed } from '../../utils/embed'
import { options } from '../../events/_start'

export const config: CommandConfig = {
    description: 'Get information about any product',
    options: [
        {
            name: 'product',
            description: 'Product Name',
            type: 'string',
            autocomplete: true,
            required: true
        },]
}

export default async (interaction: CommandInteraction): Promise<CommandResult> => {
    const productId = interaction.options.get('product')!.value!.toString();
    const res = await Product.findById(productId).exec();
    return {
        embeds: [genProductEmbed(res as ProductType)],
        components: [
            new ActionRowBuilder<ButtonBuilder>()
                .addComponents(new ButtonBuilder()
                .setURL(`https://${options.domain}/store/${res?._id}`)
                    .setLabel('Visit Product On Website')
                    .setStyle(ButtonStyle.Link)
                )
        ],
    }
}

export const autocomplete = async (interaction: AutocompleteInteraction) => {
    const query = interaction.options.get('product')?.value?.toString() ?? '';
    const listOfProducts = await Product.find().$where(`this.title.includes('${query}')`).exec();
    return listOfProducts.map((x) => ({ name: x.title, value: x._id }))
};