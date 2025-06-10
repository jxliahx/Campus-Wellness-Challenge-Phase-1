const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'Campus-Wellness-Challenge'  // Updated capitalization
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        console.log(`Database Name: ${conn.connection.name}`.cyan.underline);
        
        // Log available collections
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
    } catch (error) {
        console.log('Database connection error:', error);
        process.exit(1)
    }
}

module.exports = connectDB