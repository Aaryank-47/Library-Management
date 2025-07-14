const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// Route to record user details and book donation
router.post('/donate', adminAuth, adminController.recordDonation);

// Route to record book borrowing
router.post('/borrow', adminAuth, adminController.recordBorrowing);

// Route to generate reports for donated and borrowed books
router.get('/reports', adminAuth, adminController.generateReports);

// Route to get issued books
router.get('/issued-books', adminAuth, adminController.getIssuedBooks);

// Route to issue certificates to donors
router.post('/issue-certificate', adminAuth, adminController.issueCertificate);
router.post('/certificates', adminAuth, adminController.issueCertificate);

// Route to get issued books
router.get('/issued-books', adminAuth, adminController.getIssuedBooks);

module.exports = router;