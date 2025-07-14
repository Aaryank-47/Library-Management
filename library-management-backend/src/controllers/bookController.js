const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

// Get all books with filtering, sorting and pagination
exports.getAllBooks = async (req, res) => {
    try {
        const { 
            title, 
            author, 
            genre, 
            available, 
            hasEbook,
            sort, 
            page = 1, 
            limit = 20
        } = req.query;

        // Build filter object
        const filter = {};
        
        if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        if (author) filter.author = { $regex: author, $options: 'i' };
        if (genre) filter.genre = { $regex: genre, $options: 'i' };
        if (available === 'true') filter.availableCopies = { $gt: 0 };
        if (hasEbook === 'true') filter.hasEbook = true;
        
        // For regular users, only show approved books
        if (!req.admin) {
            filter.status = 'approved';
        }
        
        // Count total books matching the filter
        const totalBooks = await Book.countDocuments(filter);
        
        // Build query with pagination and sorting
        let query = Book.find(filter);
        
        // Apply sorting if specified
        if (sort) {
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            query = query.sort({ [sortField]: sortOrder });
        } else {
            // Default sort by creation date (newest first)
            query = query.sort({ createdAt: -1 });
        }
        
        // Apply pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        query = query
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        
        // Add population for related fields
        query = query
            .populate('donatedBy', 'name email')
            .populate('approvedBy', 'name email');
        
        // Execute query
        const books = await query;
        
        res.status(200).json({
            count: books.length,
            total: totalBooks,
            totalPages: Math.ceil(totalBooks / limitNum),
            currentPage: pageNum,
            books
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
};

// Donate a book
exports.donateBook = async (req, res) => {
    try {
        const { title, author, userId } = req.body;

        // ✅ Get uploaded book cover image URL from Cloudinary
        const bookCoverUrl = req.files?.bookCover?.[0]?.path || null;

        const newBook = new Book({
            title,
            author,
            available: true,
            donatedBy: userId,
            bookCoverUrl // ✅ Save Cloudinary URL
        });

        await newBook.save();

        const transaction = new Transaction({
            userId,
            bookId: newBook._id,
            type: 'donation',
            timestamp: Date.now()
        });

        await transaction.save();

        res.status(201).json({
            message: 'Book donated successfully',
            book: newBook
        });
    } catch (error) {
        res.status(500).json({ message: 'Error donating book', error: error.message });
    }
};


// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        
        const book = await Book.findById(bookId);
        if (!book || !book.available) {
            return res.status(404).json({ message: 'Book not available' });
        }
        
        book.available = false;
        await book.save();
        
        const transaction = new Transaction({
            userId,
            bookId,
            type: 'borrowing',
            timestamp: Date.now()
        });
        
        await transaction.save();
        
        res.status(200).json({
            message: 'Book borrowed successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing book', error: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        book.available = true;
        await book.save();
        
        const transaction = new Transaction({
            userId,
            bookId,
            type: 'return',
            timestamp: Date.now()
        });
        
        await transaction.save();
        
        res.status(200).json({
            message: 'Book returned successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: 'Error returning book', error: error.message });
    }
};

// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
};

// Get issued books
exports.getIssuedBooks = async (req, res) => {
    try {
        // Find all transactions of type 'borrowing' that don't have a corresponding 'return'
        const transactions = await Transaction.find({ type: 'borrowing' })
            .populate('bookId')
            .populate('userId', 'name email');
            
        // Filter transactions to find books that are still issued (not returned)
        const issuedBooks = [];
        for (const transaction of transactions) {
            const returnTransaction = await Transaction.findOne({
                bookId: transaction.bookId._id,
                type: 'return',
                timestamp: { $gt: transaction.timestamp }
            });
            
            if (!returnTransaction) {
                issuedBooks.push({
                    book: transaction.bookId,
                    borrowedBy: transaction.userId,
                    borrowedAt: transaction.timestamp
                });
            }
        }
        
        res.status(200).json({
            count: issuedBooks.length,
            issuedBooks
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving issued books', error: error.message });
    }
};

// Admin upload a new book with details and cover
exports.adminUploadBook = async (req, res) => {
    try {
        const { 
            title, 
            author, 
            genre, 
            description, 
            publishedYear, 
            isbn, 
            availableCopies, 
            totalCopies 
        } = req.body;
        
        // Create new book object with basic details
        const newBook = new Book({
            title,
            author,
            genre,
            description,
            publishedYear,
            isbn,
            availableCopies: availableCopies || 1,
            totalCopies: totalCopies || 1,
            status: 'approved',
            approvedBy: req.admin._id,
            approvedAt: new Date()
        });
        
        // Add cover image if uploaded
        if (req.files && req.files.bookCover && req.files.bookCover[0]) {
            newBook.coverImage = req.files.bookCover[0].path;
        }
        
        // Add PDF if uploaded
        if (req.files && req.files.bookPdf && req.files.bookPdf[0]) {
            newBook.pdfUrl = req.files.bookPdf[0].path;
            newBook.hasEbook = true;
        }
        
        await newBook.save();
        
        res.status(201).json({
            message: 'Book uploaded successfully',
            book: newBook
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading book', error: error.message });
    }
};

// Admin update book cover image
exports.updateBookCover = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        if (!req.file) {
            return res.status(400).json({ message: 'No cover image uploaded' });
        }
        
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        book.coverImage = req.file.path;
        await book.save();
        
        res.status(200).json({
            message: 'Book cover updated successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book cover', error: error.message });
    }
};

// Admin upload e-book PDF
exports.uploadEbook = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        if (!req.file) {
            return res.status(400).json({ message: 'No PDF file uploaded' });
        }
        
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        book.pdfUrl = req.file.path;
        book.hasEbook = true;
        await book.save();
        
        res.status(200).json({
            message: 'E-book PDF uploaded successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading e-book', error: error.message });
    }
};

// Update book details
exports.updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updates = req.body;
        
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        // If updating status to approved
        if (updates.status === 'approved') {
            updates.approvedAt = new Date();
            updates.approvedBy = req.admin._id;
        }
        
        // Apply updates
        Object.keys(updates).forEach(key => {
            book[key] = updates[key];
        });
        
        await book.save();
        
        res.status(200).json({
            message: 'Book updated successfully',
            book
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

// Download e-book PDF
exports.downloadEbook = async (req, res) => {
    try {
        const { id } = req.params;
        
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        if (!book.hasEbook || !book.pdfUrl) {
            return res.status(404).json({ message: 'E-book not available for this book' });
        }
        
        // Send the file
        res.download(book.pdfUrl, `${book.title}.pdf`, (err) => {
            if (err) {
                res.status(500).json({ message: 'Error downloading file', error: err.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error downloading e-book', error: error.message });
    }
};