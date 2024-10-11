import type { CommandConfig, CommandResult } from 'robo.js'
import { Product, ProductType } from '../../database'
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js'
import { genProductEmbed } from '../../utils/embed'

export const config: CommandConfig = {
    description: 'Delete product from store...',
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
    const res = await Product.deleteOne({_id:productId}).exec();
   return `Deleted successfully`
}

export const autocomplete = async (interaction: AutocompleteInteraction) => {
    const query = interaction.options.get('product')?.value?.toString() ?? '';
    const listOfProducts = await Product.find().$where(`this.title.includes('${query}')`).exec();
    return listOfProducts.map((x) => ({ name: x.title, value: x._id }))
};