// Load environment variables from .env file
require('dotenv').config();

// Export environment variables with fallbacks for safety
module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/library',
    JWT_SECRET: process.env.JWT_SECRET || 'your_secure_jwt_secret_key',
    UPLOADS_PATH: process.env.UPLOADS_PATH || 'uploads/',
    CERTIFICATES_PATH: process.env.CERTIFICATES_PATH || 'uploads/certificates/',
};