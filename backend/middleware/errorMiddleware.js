const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    if (statusCode >= 500) console.error(error);
    res.status(statusCode).json({
        success: false,
        error: statusCode >= 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    });
};

module.exports = { notFound, errorHandler };
