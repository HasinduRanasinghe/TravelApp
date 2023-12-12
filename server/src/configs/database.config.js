/**
 * @file database.config.js
 * @description database connection and configurations.
 * @author WE-CSSE-58
 * @version 1.0.0
 * @date October 11, 2023
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { DB_URL } = require('./general.config'); // Import the database URL

// Wrap the database connection in a promise to handle connection errors
const dbConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Database connection established.');
                resolve();
            })
            // Handle database connection error
            .catch((err) => {
                console.error('Database connection error:', err);
                reject(err);
            });
    });
};

module.exports = { dbConnection };