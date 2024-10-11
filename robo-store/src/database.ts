/**
 * Imports required
 */
import mongoose from 'mongoose';
import { options } from './events/_start';
const { Schema } = mongoose;

/**
 * Types
 */
export interface ProductType {
    title: string;
    price: number;
    image: string;
    createdAt: NativeDate;
    stockout: boolean;
    description?: string;
    category?: string;
    discount: number;
}

/**
 * Schemas
 */
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 99
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        lowercase: true,
        required: false,
    },
    image: {
        type: String,
        required: true
    },
    stockout: {
        type: Boolean,
        default: false
    }
});


/**
 * Mongo Models
 */
export const Product = mongoose.model('Product', productSchema);