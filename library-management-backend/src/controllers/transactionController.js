const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Book = require('../models/Book');

// Record donation
exports.recordDonation = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        
        // Create transaction
        const transaction = new Transaction({
            userId,
            bookId,
            type: 'donation',
            timestamp: Date.now()
        });
        
        await transaction.save();
        
        // Update book status if needed
        await Book.findByIdAndUpdate(bookId, {
            available: true,
            donatedBy: userId
        });
        
        res.status(201).json({
            message: 'Donation recorded successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Error recording donation', error: error.message });
    }
};

// Record borrowing
exports.recordBorrowing = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        
        // Check if book is available
        const book = await Book.findById(bookId);
        if (!book || !book.available) {
            return res.status(400).json({ message: 'Book is not available for borrowing' });
        }
        
        // Create transaction
        const transaction = new Transaction({
            userId,
            bookId,
            type: 'borrowing',
            timestamp: Date.now()
        });
        
        await transaction.save();
        
        // Update book status
        book.available = false;
        book.borrowedBy = userId;
        await book.save();
        
        res.status(201).json({
            message: 'Borrowing recorded successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Error recording borrowing', error: error.message });
    }
};

// Get user transactions
exports.getUserTransactions = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const transactions = await Transaction.find({ userId })
            .populate('bookId')
            .sort({ timestamp: -1 });
        
        res.status(200).json({
            count: transactions.length,
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user transactions', error: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('userId', 'name email')
            .populate('bookId', 'title author available')
            .sort({ timestamp: -1 });
        
        res.status(200).json({
            count: transactions.length,
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const transaction = await Transaction.findById(id)
            .populate('userId', 'name email')
            .populate('bookId', 'title author available');
            
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction', error: error.message });
    }
};

// Generate reports
exports.generateReports = async (req, res) => {
    try {
        const ReportService = require('../services/reportService');
        const reportService = new ReportService();
        
        const reports = await reportService.generateReports();
        
        res.status(200).json({
            message: 'Reports generated successfully',
            data: reports
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating reports', error: error.message });
    }
};