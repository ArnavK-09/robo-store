import { createCommandConfig } from 'robo.js'
import type { CommandOptions } from 'robo.js'
import type { CommandInteraction } from 'discord.js'
import { Product } from '../../database'
import { options } from '../../events/_start'

export const config = createCommandConfig({
    description: 'Create new product',
    options: [
        {
            name: 'title',
            type: 'string',
            required: true
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'price',
            type: 'number',
            required: true
        },
        {
            name: 'image',
            type: 'attachment',
            required: true
        }, {
            name: 'category',
            type: 'string',
            autocomplete: true,
        },
    ]
} as const)

export default async (interaction: CommandInteraction, options: CommandOptions<typeof config>) => {
    const newProduct = new Product({
        title: options.title,
        description: options.description,
        category: options.category,
        price: options.price,
        image: options.image!.url
    });
    const res = await newProduct.save();
    return `Product ${res.title} saved!`
}
export const autocomplete = async () => {
    return options.categories.map(x => {
        return  {
            name: x,value:x
        }
    })
};