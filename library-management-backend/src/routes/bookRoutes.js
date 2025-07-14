const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { uploadBookWithDetails } = require('../middlewares/fileUpload');


// Route to view all available books
router.get('/', bookController.getAllBooks);

// Route to get latest books
router.get('/latest', (req, res, next) => {
    req.query.limit = 10;
    req.query.sort = '-createdAt';
    next();
}, bookController.getAllBooks);

// Route to donate a book
router.post('/donate',uploadBookWithDetails, bookController.donateBook);

// Route to borrow a book
router.post('/borrow', bookController.borrowBook);

// Route to return a borrowed book
router.post('/return', bookController.returnBook);

// Route to get issued books by a user
router.get('/issued', bookController.getIssuedBooks);

// Route to download e-book PDF if available
router.get('/download/:id', bookController.downloadEbook);

// Route to get details of a specific book
router.get('/:id', bookController.getBookById);

module.exports = router;