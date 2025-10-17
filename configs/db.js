const mongoose = require('mongoose');
require('dotenv').config();

// Use MONGODB_URL from .env (provided by the user). Export an object so callers
// using `const { db } = require('./configs/db')` work correctly.
const db = mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

module.exports = { db };