const Order = require('../models/Order');
const { placeOrder } = require('../services/orderService');

const createOrder = async (req, res) => {
    const key = req.headers['idempotency-key'] || req.body.idempotencyKey;
    if (!key || String(key).length > 100) return res.status(400).json({ success: false, error: 'An idempotency key is required' });
    res.status(201).json({ success: true, order: await placeOrder(req.user.userId, String(key)) });
};
const listOrders = async (req, res) => res.json({ success: true, orders: await Order.find({ user: req.user.userId }).sort({ createdAt: -1 }) });

module.exports = { createOrder, listOrders };
