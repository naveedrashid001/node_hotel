const mongoose = require('mongoose');

const mongooseurl = "mongodb://localhost:27017/voting_app";

mongoose.connect(mongooseurl, {});

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
