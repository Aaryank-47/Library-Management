const express = require('express');
const authController = require('../controllers/authController');
const userAuth = require('../middlewares/userAuth');

const router = express.Router();
// rgister 
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// User logout route
router.post('/logout',  authController.logout);

router.post('/admin/register', authController.adminRegister);


// Admin login route
router.post('/admin/login', authController.adminLogin);

// Admin logout route
router.post('/admin/logout', authController.adminLogout);

module.exports = router;