import { Router } from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteProductFromOrder,
    cancelOrder
} from '../controllers/order.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

// Admin routes
router.get('/orders/admin/all', authRequired, isAdmin, getAllOrders);
router.put('/orders/:orderId/status', authRequired, isAdmin, updateOrderStatus);

// User routes (require authentication)
router.post('/orders/crear-orden', authRequired, createOrder);
router.get('/orders', authRequired, getUserOrders);
router.get('/orders/:orderId', authRequired, getOrderById);

router.delete('/orders/:orderId/products/:productId', authRequired, deleteProductFromOrder);
router.delete('/orders/:orderId', authRequired, cancelOrder);

export default router;
