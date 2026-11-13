const mongoose = require('mongoose');

const connectDb = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pesufoods';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
};

module.exports = connectDb;
