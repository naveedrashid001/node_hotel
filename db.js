const mongoose = require('mongoose');

const mongooseUrl = "mongodb://localhost:27017/node_hotel";

mongoose.connect(mongooseUrl, {});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db;
