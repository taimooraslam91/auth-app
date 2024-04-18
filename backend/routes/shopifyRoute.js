import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { shopifyProductSync } from '../controllers/shopifyController.js';
const router = express.Router();

router.post('/', protect, admin, shopifyProductSync);

export default router;
