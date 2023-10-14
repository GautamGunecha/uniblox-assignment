import express from 'express';
import { addToCart } from '../../controllers/cart/index.js'

const router = express.Router();

router.post('/', addToCart);
router.get('/', addToCart);

export default router;