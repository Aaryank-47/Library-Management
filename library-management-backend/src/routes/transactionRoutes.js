const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

// Route to record a book donation
router.post('/donate', userAuth, transactionController.recordDonation);

// Route to record a book borrowing
router.post('/borrow', userAuth, transactionController.recordBorrowing);

// Route to get all transactions
router.get('/', adminAuth, transactionController.getAllTransactions);

// Route to get user transactions
router.get('/user/:userId', userAuth, transactionController.getUserTransactions);

// Route to get a specific transaction by ID
router.get('/:id', adminAuth, transactionController.getTransactionById);

// Route to generate reports for donated and borrowed books
router.get('/reports', adminAuth, transactionController.generateReports);

module.exports = router;