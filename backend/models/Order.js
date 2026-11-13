const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    canteen: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true },
    canteenName: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ['PENDING', 'SIMULATED'], default: 'PENDING' },
    status: { type: String, enum: ['PLACED', 'CANCELLED'], default: 'PLACED' },
    idempotencyKey: { type: String, required: true },
}, { timestamps: true });

orderSchema.index({ user: 1, idempotencyKey: 1 }, { unique: true });
module.exports = mongoose.model('Order', orderSchema);
