import { Router } from 'express';
import { createPaymentIntent } from '../controllers/payment.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create-payment-intent', authRequired, createPaymentIntent);

export default router;
