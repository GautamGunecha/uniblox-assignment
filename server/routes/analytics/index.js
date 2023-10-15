import express from 'express';
import { analytics } from '../../controllers/analytics/index.js';

const router = express.Router();

router.get('/', analytics)

export default router;