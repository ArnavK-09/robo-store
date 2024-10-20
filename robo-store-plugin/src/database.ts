// Imports Required
import mongoose, { Schema, Types } from 'mongoose';
import {nanoid} from "nanoid";

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
export interface OrderType {
	buyer: string;
	payment_done: boolean;
	totalAmount: number;
	status: 'pending' | 'shipped' | 'delivered' | 'canceled';
	orderedAt: Date;
	product: Types.ObjectId | ProductType;
	primary_id: string;
}

/**
 * Schemas
 */
const orderSchema = new Schema({
	primary_id: {
		type: String,
		required: true,
		unique: true,
		default: nanoid(8)
	},
	buyer: {
		type: String,
		required: true,
		max: 20
	},
	payment_done: {
		type: Boolean,
		default: false
	},
	totalAmount: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'shipped', 'delivered', 'canceled'],
		default: 'pending'
	},
	orderedAt: {
		type: Date,
		default: Date.now
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	}
});

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
		default: Date.now
	},
	category: {
		type: String,
		lowercase: true,
		required: false
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
export const Order = mongoose.model('Order', orderSchema);
