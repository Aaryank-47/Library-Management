const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const adminAuth = require('../middlewares/adminAuth');
const { uploadBookWithDetails, uploadBookCover, uploadBookPdf } = require('../middlewares/fileUpload');

// Admin route to upload a new book with details and cover
router.post('/upload', adminAuth, uploadBookWithDetails, bookController.adminUploadBook);

// Admin route to update book cover image
router.post('/update-cover/:bookId', adminAuth, uploadBookCover, bookController.updateBookCover);

// Admin route to upload e-book PDF
router.post('/upload-ebook/:bookId', adminAuth, uploadBookPdf, bookController.uploadEbook);

// Admin route to approve a donated book
router.post('/approve-book/:bookId', adminAuth, (req, res) => {
    req.body.status = 'approved';
    bookController.updateBook(req, res);
});

module.exports = router;
