// routes/order.routes.js
import express from 'express';
import { getOrderHistory, createOrder } from '../controllers/order.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Get order history for the logged-in user
router.get('/order-history', verifyJWT, getOrderHistory);

// Create new order (if not done already)
router.post('/create-order', verifyJWT, createOrder);

export default router;
