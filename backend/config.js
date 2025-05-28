const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/LoginMembers'; // Replace with your actual database name

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
