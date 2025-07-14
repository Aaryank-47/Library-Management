const TransactionService = require('../services/transactionService');
const ReportService = require('../services/reportService');

const transactionService = new TransactionService();
const reportService = new ReportService();

// Record book donation
exports.recordDonation = async (req, res) => {
    try {
        const donationDetails = req.body;
        const result = await transactionService.recordDonation(donationDetails);
        res.status(201).json({ message: 'Donation recorded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error recording donation', error: error.message });
    }
};

// Record book borrowing
exports.recordBorrowing = async (req, res) => {
    try {
        const borrowDetails = req.body;
        const result = await transactionService.recordBorrowing(borrowDetails);
        res.status(201).json({ message: 'Borrowing recorded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error recording borrowing', error: error.message });
    }
};

// Generate reports for donated and borrowed books
exports.generateReports = async (req, res) => {
    try {
        const reportData = await reportService.generateReports();
        res.status(200).json({ message: 'Reports generated successfully', data: reportData });
    } catch (error) {
        res.status(500).json({ message: 'Error generating reports', error: error.message });
    }
};

// Get all issued books
exports.getIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await transactionService.getIssuedBooks();
        res.status(200).json({ message: 'Issued books retrieved successfully', data: issuedBooks });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving issued books', error: error.message });
    }
};

// Issue certificate to donor
exports.issueCertificate = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const result = await transactionService.issueCertificate(userId, bookId);
        res.status(200).json({ message: 'Certificate issued successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error issuing certificate', error: error.message });
    }
};