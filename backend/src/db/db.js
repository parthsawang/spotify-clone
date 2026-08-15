const mongoose = require('mongoose');

async function connectDB() {
    try {
        console.log(process.env.DATA_URL);

        await mongoose.connect(process.env.DATA_URL);

        console.log("Database connected successfully");
    } catch (error) {
        console.error("database connection error:", error);
    }
}

module.exports = connectDB;