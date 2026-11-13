const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const ApiError = require('../utils/ApiError');

const placeOrder = async (userId, idempotencyKey) => {
    const existing = await Order.findOne({ user: userId, idempotencyKey });
    if (existing) return existing;

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) throw new ApiError(400, 'Your cart is empty');
    const session = await mongoose.startSession();
    try {
        let order;
        await session.withTransaction(async () => {
            const reservedItems = [];
            for (const item of cart.items) {
                const menuItem = await Menu.findOneAndUpdate(
                    { _id: item.menuItem, available: true, stock: { $gte: item.quantity } },
                    { $inc: { stock: -item.quantity } },
                    { new: true, session },
                );
                if (!menuItem) throw new ApiError(409, `${item.name} is unavailable or has insufficient stock`);
                reservedItems.push({ menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: item.quantity });
            }
            const total = reservedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            [order] = await Order.create([{
                user: userId,
                canteen: cart.canteen,
                canteenName: cart.canteenName,
                items: reservedItems,
                total,
                paymentStatus: 'SIMULATED',
                idempotencyKey,
            }], { session });
            await Cart.deleteOne({ _id: cart._id }, { session });
        });
        return order;
    } finally {
        await session.endSession();
    }
};

module.exports = { placeOrder };
