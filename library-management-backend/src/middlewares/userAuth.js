const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};

module.exports = userAuth;