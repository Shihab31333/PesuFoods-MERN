const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const signToken = (user) => jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'development-only-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
);

const signup = async (req, res) => {
    const { name, usermail, password } = req.body;
    if (!name || !usermail || !password || password.length < 6) throw new ApiError(400, 'Name, email, and a password of at least 6 characters are required');
    const email = usermail.trim().toLowerCase();
    if (await User.exists({ usermail: email })) throw new ApiError(409, 'User already exists');
    const user = await User.create({ name: name.trim(), usermail: email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, message: 'User created successfully', user: { id: user._id, name: user.name, usermail: user.usermail } });
};

const login = async (req, res) => {
    const { usermail, password } = req.body;
    const user = await User.findOne({ usermail: String(usermail || '').trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) throw new ApiError(401, 'Invalid credentials');
    res.json({ success: true, token: signToken(user), user: { id: user._id, name: user.name, usermail: user.usermail, role: user.role } });
};

const account = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) throw new ApiError(404, 'User not found');
    res.json({ success: true, user });
};

module.exports = { signup, login, account };
