const express = require('express');
const { signup, login, account } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/account', requireAuth, asyncHandler(account));
module.exports = router;
