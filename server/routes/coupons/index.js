import express from "express";
import { generateCouponCode } from '../../controllers/coupons/index.js'; 

const router = express.Router();

router.post('/', generateCouponCode);

export default router;
