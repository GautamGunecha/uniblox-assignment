import { Schema } from "mongoose";
import uniblox from "../../config/index.js";

const orderItemSchema = new Schema({
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


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    discountCode: {
        type: String,
        default: null,
    },
    placedOn: {
        type: Date,
        default: Date.now,
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

const Orders = uniblox.model('Orders', orderSchema);
export default Orders;
