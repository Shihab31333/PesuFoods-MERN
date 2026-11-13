const Cart = require('../models/Cart');
const Menu = require('../models/Menu');
const Canteen = require('../models/Canteen');
const ApiError = require('../utils/ApiError');

const getCart = async (req, res) => res.json({ success: true, cart: await Cart.findOne({ user: req.user.userId }) });
const addItem = async (req, res) => {
    const { menuItemId, quantity = 1 } = req.body;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new ApiError(400, 'Quantity must be an integer between 1 and 99');
    const item = await Menu.findById(menuItemId);
    if (!item || !item.available) throw new ApiError(404, 'Menu item is unavailable');
    if (quantity > item.stock) throw new ApiError(409, 'Requested quantity exceeds available stock');
    const canteen = await Canteen.findById(item.canteen);
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) cart = new Cart({ user: req.user.userId, canteen: canteen._id, canteenName: canteen.name, items: [] });
    if (cart.canteen.toString() !== item.canteen.toString()) throw new ApiError(409, `Your cart contains items from ${cart.canteenName}. Clear it before ordering from another canteen.`);
    const existing = cart.items.find((entry) => entry.menuItem.toString() === item._id.toString());
    if (existing) {
        if (existing.quantity + quantity > item.stock) throw new ApiError(409, 'Requested quantity exceeds available stock');
        existing.quantity += quantity;
    } else cart.items.push({ menuItem: item._id, name: item.name, price: item.price, image: item.image, quantity });
    await cart.save();
    res.status(201).json({ success: true, cart });
};
const updateItem = async (req, res) => {
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new ApiError(400, 'Quantity must be an integer between 1 and 99');
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) throw new ApiError(404, 'Cart not found');
    const entry = cart.items.find((item) => item.menuItem.toString() === req.params.menuItemId);
    if (!entry) throw new ApiError(404, 'Cart item not found');
    const item = await Menu.findById(entry.menuItem);
    if (!item || quantity > item.stock) throw new ApiError(409, 'Requested quantity exceeds available stock');
    entry.quantity = quantity;
    await cart.save();
    res.json({ success: true, cart });
};
const removeItem = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) throw new ApiError(404, 'Cart not found');
    cart.items = cart.items.filter((item) => item.menuItem.toString() !== req.params.menuItemId);
    if (cart.items.length === 0) await Cart.deleteOne({ _id: cart._id });
    else await cart.save();
    res.json({ success: true, cart: cart.items.length ? cart : null });
};
const clearCart = async (req, res) => {
    await Cart.deleteOne({ user: req.user.userId });
    res.json({ success: true, cart: null });
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
