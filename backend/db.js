const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const mongoURI = process.env.MONGO_URI; // Access the MongoDB URI from environment variable

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectToMongo;