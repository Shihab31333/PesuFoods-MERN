const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');
const controller = require('../controllers/orderController');
const router = express.Router();
router.use(requireAuth);
router.post('/', asyncHandler(controller.createOrder));
router.get('/', asyncHandler(controller.listOrders));
module.exports = router;
