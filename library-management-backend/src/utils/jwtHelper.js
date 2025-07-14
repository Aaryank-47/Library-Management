const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    verifyToken,
};