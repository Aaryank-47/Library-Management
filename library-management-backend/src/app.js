const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const adminBookRoutes = require('./routes/adminBookRoutes');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandler = require('./middlewares/errorHandler');
const env = require('./config/env');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const dbConfig = require('./config/in-memory-db');

// Check if we should use in-memory DB (for development/testing) or real MongoDB
const useInMemoryDb = process.env.USE_MEMORY_DB === 'true' || !process.env.DB_URI;

if (useInMemoryDb) {
    console.log('Using in-memory MongoDB database for development/testing...');
    dbConfig.connect()
        .then(() => console.log('In-memory MongoDB connected successfully'))
        .catch(err => console.error('In-memory MongoDB connection error:', err));
} else {
    // Construct the MongoDB URI using individual parts for better flexibility
    const mongoHost = process.env.MONGODB_HOST || '127.0.0.1';
    const mongoPort = process.env.MONGODB_PORT || '27017';
    const mongoDb = process.env.MONGODB_DB || 'library_management';
    const mongoUri = process.env.DB_URI || `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

    console.log(`Attempting to connect to MongoDB at ${mongoUri}...`);

    // Connect with more robust error handling
    mongoose.connect(mongoUri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // Longer timeout for slower systems
        family: 4 // Force IPv4 (fixes some localhost/::1 issues)
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.log('\nPossible solutions:');
        console.log('1. Make sure MongoDB is installed and running');
        console.log('2. Run: mongod --dbpath="C:/data/db" in a separate terminal');
        console.log('3. Try connecting to 127.0.0.1 instead of localhost');
        console.log('4. Set USE_MEMORY_DB=true in your .env to use in-memory database');
        process.exit(1); // Exit with error
    });
}

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin/books', adminBookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/transactions', transactionRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use(errorHandler);

// Export the app
module.exports = app;