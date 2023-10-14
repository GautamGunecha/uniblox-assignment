import { Schema } from 'mongoose';
import uniblox from '../../config/index.js';

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    }
}, { _id: false })

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true })

const Carts = uniblox.model('Carts', cartSchema);
export default Carts
