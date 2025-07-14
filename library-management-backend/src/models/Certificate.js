const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
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
    issuedDate: {
        type: Date,
        default: Date.now
    },
    certificateUrl: {
        type: String,
        required: true
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;