const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

/*rgistretion */
exports.register = async (req, res) => {
  try {
    const { userId, username, email, password } = req.body;

    // Check for existing userId or email
    const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'UserId or email already exists' });
    }

    const newUser = new User({ userId, username, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;   // ✅ Accept userId instead of email
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.comparePassword(password)) {
            const token = jwt.sign({ id: user._id, role: 'user' }, env.JWT_SECRET, {
                expiresIn: '1d'
            });

            // ✅ Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // use true in production
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    userId: user.userId,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// User logout
exports.logout = async (req, res) => {
    try {
       res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error: error.message });
    }
};
// Admin Register
exports.adminRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ message: 'Admin already exists with this email or username' });
        }

        const admin = new Admin({ username, email, password });
        await admin.save();

        const token = jwt.sign({ id: admin._id, role: 'admin' }, env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                hashedPassword: admin.password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during admin registration', error: error.message });
    }
};



// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                hashedPassword: admin.password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during admin login', error: error.message });
    }
};


// Admin logout
exports.adminLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Admin logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during admin logout', error: error.message });
    }
};