const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    coverImage: {
        type: String, // Path to the uploaded image file
        required: false,
    },
    pdfUrl: {
        type: String, // Path to the uploaded PDF file
        required: false,
    },
    hasEbook: {
        type: Boolean,
        default: false,
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1,
    },
    totalCopies: {
        type: Number,
        required: true,
        default: 1,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedAt: {
        type: Date,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    donatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowedBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        borrowDate: {
            type: Date,
            default: Date.now
        },
        returnDate: {
            type: Date
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;