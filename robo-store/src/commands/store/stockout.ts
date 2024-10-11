import type { CommandConfig } from 'robo.js'
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js'
import { Product } from '../../database';

export const config: CommandConfig = {
    description: 'Mark product as stockout',
    options: [
        {
            name: 'product',
            description: 'Product Name',
            type: 'string',
            autocomplete: true,
            required: true
        },
        {
            name: 'stock_out',
            description: 'Is product stockout',
            type: 'string',
            required: true,
            choices: [
                {
                    name: 'True',
                    value: 'true'
                },
                {
                    name: 'False',
                    value: 'false'
                }
            ]
        },
    ]
}

export default async(interaction: CommandInteraction) => {
    const productId = interaction.options.get('product')!.value!.toString();
    const stockOut = interaction.options.get('stock_out')?.value?.toString() ?? 'true';
    const res = await Product.updateOne({_id: productId}, {stockout: stockOut=='true'}).exec()
    return `${res.acknowledged} Updated!`
}

export const autocomplete = async (interaction: AutocompleteInteraction) => {
    const query = interaction.options.get('product')?.value?.toString() ?? '';
    const listOfProducts = await Product.find().$where(`this.title.includes('${query}')`).exec();
    return listOfProducts.map((x) => ({ name: x.title, value: x._id }))
};
