import express from 'express';
import { addToCart, getCartItems } from '../../controllers/cart/index.js'

const router = express.Router();

router.post('/', addToCart);
router.get('/', getCartItems);

export default router;