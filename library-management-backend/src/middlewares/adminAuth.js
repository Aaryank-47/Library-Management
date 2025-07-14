const jwt = require('jsonwebtoken');
const { Admin } = require('../models/Admin');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!admin) {
            return res.status(401).send({ error: 'Please authenticate as an admin.' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate as an admin.' });
    }
};

module.exports = adminAuth;