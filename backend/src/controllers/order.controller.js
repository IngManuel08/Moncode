import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import { sendOrderConfirmation } from '../libs/mail.config.js';

export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Se requiere un arreglo de items y no puede estar vacío' });
        }

        let calculatedTotal = 0;
        const itemsWithPrices = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto ${item.productId} no encontrado` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Cantidad insuficiente de ${product.name}. Stock disponible: ${product.quantity}` });
            }

            const subtotal = product.price * item.quantity;
            calculatedTotal += subtotal;

            itemsWithPrices.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });
        }

        // Create the order with calculated total
        const newOrder = new Order({
            userId,
            items: itemsWithPrices,
            total: calculatedTotal,
            status: 'pending'
        });

        await newOrder.save();

        // Update product stock
        for (const item of itemsWithPrices) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { quantity: -item.quantity } },
                { new: true }
            );
        }

        // Send confirmation email
        // We get the user details from req.user
        // Wait, req.user does not have email by default, we need it.
        // I will first import User model or check if req.user has email.
        const user = await import('../models/user.models.js').then(m => m.default.findById(userId));
        if (user && user.email) {
            await sendOrderConfirmation(user.email, newOrder);
        }

        res.status(201).json({
            message: 'Orden creada exitosamente',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findById(orderId)
            .populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Orden no autorizada' });
        }

        // Verify the order belongs to the user
        if (order.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No autorizado para ver esta orden' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId')
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Estado invalido' });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status, updatedAt: Date.now() },
            { new: true }
        ).populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({
            message: 'Estado de orden Actualizado correctamente',
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductFromOrder = async (req, res) => {
    try {
        const { orderId, productId } = req.params;
        const userId = req.user.id;

        // Get the order
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verify the order belongs to the user
        if (order.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No autorizado para modificar esta orden' });
        }

        const itemIndex = order.items.findIndex(item =>
            item.productId.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Producto no encontrado en la orden' });
        }

        // Get the item quantity before removal to restore stock
        const removedItem = order.items[itemIndex];

        // Remove the item from the order
        order.items.splice(itemIndex, 1);

        if (order.items.length > 0) {
            order.total = order.items.reduce((sum, item) => {
                const itemPrice = item.price || 0;
                const itemQuantity = item.quantity || 0;
                return sum + (itemPrice * itemQuantity);
            }, 0);
        } else {
            order.total = 0;
        }

        // Update the updatedAt timestamp
        order.updatedAt = Date.now();

        // Restore the product quantity to inventory
        await Product.findByIdAndUpdate(
            productId,
            { $inc: { quantity: removedItem.quantity } },
            { new: true }
        );

        // Save the updated order
        await order.save();

        res.status(200).json({
            message: 'Producto eliminado de la orden exitosamente',
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // Get the order
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verify the order belongs to the user
        if (order.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No autorizado para cancelar esta orden' });
        }

        // Check if order is already cancelled
        if (order.status === 'cancelled') {
            return res.status(400).json({ message: 'La orden ya ha sido cancelada' });
        }

        // Restore stock for all products in the order
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { quantity: item.quantity } },
                { new: true }
            );
        }

        // Update order status to cancelled and clear items
        order.status = 'cancelled';
        order.total = 0;
        order.items = [];
        order.updatedAt = Date.now();

        await order.save();

        res.status(200).json({
            message: 'Orden cancelada exitosamente. Stock restaurado.',
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
