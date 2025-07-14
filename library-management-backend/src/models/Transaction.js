const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    transactionType: {
        type: String,
        enum: ['donation', 'borrowing'],
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;