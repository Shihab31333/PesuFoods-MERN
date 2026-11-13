const Canteen = require('../models/Canteen');
const Menu = require('../models/Menu');
const ApiError = require('../utils/ApiError');

const listCanteens = async (req, res) => res.json({ success: true, canteens: await Canteen.find().sort({ name: 1 }) });
const getCanteen = async (req, res) => {
    const canteen = await Canteen.findById(req.params.id);
    if (!canteen) throw new ApiError(404, 'Canteen not found');
    res.json({ success: true, canteen });
};
const listMenu = async (req, res) => {
    const filter = { canteen: req.params.canteenId, available: true };
    if (req.query.search) filter.name = { $regex: String(req.query.search), $options: 'i' };
    const items = await Menu.find(filter).sort({ name: 1 });
    res.json({ success: true, items });
};
const getMenuItem = async (req, res) => {
    const item = await Menu.findById(req.params.id).populate('canteen', 'name');
    if (!item) throw new ApiError(404, 'Menu item not found');
    res.json({ success: true, item });
};
const searchMenu = async (req, res) => {
    const items = await Menu.find({ available: true, name: { $regex: String(req.query.q || ''), $options: 'i' } }).populate('canteen', 'name');
    res.json({ success: true, items });
};

module.exports = { listCanteens, getCanteen, listMenu, getMenuItem, searchMenu };
