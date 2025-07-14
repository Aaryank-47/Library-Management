const ReportService = require('../services/reportService');

class ReportController {
    async getDonatedBooksReport(req, res) {
        try {
            const reportData = await ReportService.generateDonatedBooksReport();
            res.status(200).json(reportData);
        } catch (error) {
            res.status(500).json({ message: 'Error generating donated books report', error });
        }
    }

    async getBorrowedBooksReport(req, res) {
        try {
            const reportData = await ReportService.generateBorrowedBooksReport();
            res.status(200).json(reportData);
        } catch (error) {
            res.status(500).json({ message: 'Error generating borrowed books report', error });
        }
    }

    async getGraphsData(req, res) {
        try {
            const graphsData = await ReportService.generateGraphsData();
            res.status(200).json(graphsData);
        } catch (error) {
            res.status(500).json({ message: 'Error generating graphs data', error });
        }
    }
}

module.exports = new ReportController();