const mongoose = require('mongoose');

const canteenSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Canteen', canteenSchema);
