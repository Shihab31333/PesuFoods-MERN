const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const requireAuth = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    if (!token) return next(new ApiError(401, 'Authentication required'));

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'development-only-secret');
        next();
    } catch (error) {
        next(new ApiError(401, error.name === 'TokenExpiredError' ? 'Authentication token expired' : 'Invalid authentication token'));
    }
};

const requireRole = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, 'You do not have permission to perform this action'));
    next();
};

module.exports = { requireAuth, requireRole };
