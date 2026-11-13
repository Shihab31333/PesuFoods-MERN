const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    canteen: { type: mongoose.Schema.Types.ObjectId, ref: 'Canteen', required: true, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    stock: { type: Number, required: true, min: 0, default: 100 },
    available: { type: Boolean, default: true },
}, { timestamps: true });

menuSchema.index({ canteen: 1, name: 1 });
module.exports = mongoose.model('Menu', menuSchema);
