import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../../controllers/cart/index.js'

const router = express.Router();

router.post('/', addToCart);
router.get('/', getCartItems);
router.delete('/', removeFromCart);

export default router;