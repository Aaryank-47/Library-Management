const Certificate = require('../models/Certificate');
const Book = require('../models/Book');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const { createCertificatePDF } = require('../services/certificateService');

// Generate certificate for book donation
exports.generateCertificate = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        
        // Check if user and book exist
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        // Generate PDF certificate
        const certificateFileName = `certificate_${userId}_${bookId}_${Date.now()}.pdf`;
        const certificatePath = path.join('uploads/certificates', certificateFileName);
        
        await createCertificatePDF({
            userName: user.name,
            bookTitle: book.title,
            donationDate: new Date().toLocaleDateString(),
            certificatePath
        });
        
        // Save certificate details to database
        const certificate = new Certificate({
            userId,
            bookId,
            certificateUrl: certificatePath,
            issuedAt: Date.now()
        });
        
        await certificate.save();
        
        res.status(201).json({
            message: 'Certificate generated successfully',
            certificate
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating certificate', error: error.message });
    }
};

// Get certificate by ID
exports.getCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findById(id)
            .populate('userId', 'name email')
            .populate('bookId', 'title author');
        
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving certificate', error: error.message });
    }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find()
            .populate('userId', 'name email')
            .populate('bookId', 'title author');
        
        res.status(200).json({
            count: certificates.length,
            certificates
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving certificates', error: error.message });
    }
};