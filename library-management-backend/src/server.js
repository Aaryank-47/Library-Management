// Load environment variables directly
require('dotenv').config();
const app = require('./app');
const env = require('./config/env');
const net = require('net');

// Function to find an available port
const findAvailablePort = (startPort, callback) => {
    // Ensure port is a number and within valid range (1-65535)
    let port = parseInt(startPort, 10);
    
    // Validate port range
    if (isNaN(port) || port < 1) {
        port = 3000; // Default to 3000 if invalid
    }
    
    // Maximum port number is 65535
    const MAX_PORT = 65535;
    
    function tryPort(currentPort) {
        // Ensure we don't exceed maximum port
        if (currentPort > MAX_PORT) {
            console.error(`Exceeded maximum port number (${MAX_PORT}). Using port 3000.`);
            callback(null, 3000);
            return;
        }

        const server = net.createServer();
        
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${currentPort} is in use, trying next port...`);
                tryPort(currentPort + 1);
            } else {
                callback(err);
            }
        });
        
        server.once('listening', () => {
            server.close(() => {
                callback(null, currentPort);
            });
        });
        
        server.listen(currentPort);
    }
    
    tryPort(port);
};

// Try to start the server on an available port
const preferredPort = process.env.PORT || 9000;
findAvailablePort(preferredPort, (err, availablePort) => {
    if (err) {
        console.error('Error finding available port:', err);
        process.exit(1);
    }
    
    app.listen(availablePort, () => {
        console.log(`Server is running on http://localhost:${availablePort}`);
    });
});