import { Schema } from 'mongoose';
import uniblox from '../../config/index.js';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Products = uniblox.model('Products', productSchema);
export default Products;
