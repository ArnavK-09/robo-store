import type { CommandConfig } from 'robo.js'
import type { CommandInteraction, AutocompleteInteraction } from 'discord.js'
import { Product } from '../../database';

export const config: CommandConfig = {
    description: 'Update product discount',
    options: [
        {
            name: 'product',
            description: 'Product Name',
            type: 'string',
            autocomplete: true,
            required: true
        },
        {
            name: 'discount',
            description: 'Discount %',
            type: 'number',
            min: 0,
            max: 99,
            required: true,
        },
    ]
}

export default async (interaction: CommandInteraction) => {
    const productId = interaction.options.get('product')!.value!.toString();
    const discount = interaction.options.get('discount')?.value;
    const res = await Product.updateOne({ _id: productId }, { discount: discount }).exec()
    return `${res.acknowledged} Updated!`
}

export const autocomplete = async (interaction: AutocompleteInteraction) => {
    const query = interaction.options.get('product')?.value?.toString() ?? '';
    const listOfProducts = await Product.find().$where(`this.title.includes('${query}')`).exec();
    return listOfProducts.map((x) => ({ name: x.title, value: x._id }))
};
