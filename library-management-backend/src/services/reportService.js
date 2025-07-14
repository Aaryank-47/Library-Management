const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const moment = require('moment');

class ReportService {
    async generateReports() {
        try {
            const donationReport = await this.getDonatedBooksReport();
            const borrowingReport = await this.getBorrowedBooksReport();
            
            return {
                donations: donationReport,
                borrowings: borrowingReport,
                graphData: this.prepareGraphData(donationReport, borrowingReport)
            };
        } catch (error) {
            throw new Error(`Error generating reports: ${error.message}`);
        }
    }

    async getDonatedBooksReport() {
        try {
            // Get all donation transactions
            const donations = await Transaction.find({ type: 'donation' })
                .populate('userId', 'name email')
                .populate('bookId', 'title author')
                .sort({ timestamp: -1 });
                
            // Generate monthly stats
            const monthlyStats = this.generateMonthlyStats(donations);
            
            return {
                total: donations.length,
                recent: donations.slice(0, 5),  // 5 most recent donations
                monthlyStats
            };
        } catch (error) {
            throw new Error(`Error generating donation report: ${error.message}`);
        }
    }

    async getBorrowedBooksReport() {
        try {
            // Get all borrowing transactions
            const borrowings = await Transaction.find({ type: 'borrowing' })
                .populate('userId', 'name email')
                .populate('bookId', 'title author')
                .sort({ timestamp: -1 });
                
            // Generate monthly stats
            const monthlyStats = this.generateMonthlyStats(borrowings);
            
            return {
                total: borrowings.length,
                recent: borrowings.slice(0, 5),  // 5 most recent borrowings
                monthlyStats
            };
        } catch (error) {
            throw new Error(`Error generating borrowing report: ${error.message}`);
        }
    }

    generateMonthlyStats(transactions) {
        // Group transactions by month
        const monthlyStats = {};
        
        transactions.forEach(transaction => {
            const month = moment(transaction.timestamp).format('YYYY-MM');
            if (!monthlyStats[month]) {
                monthlyStats[month] = 0;
            }
            monthlyStats[month]++;
        });
        
        // Convert to array for easier frontend processing
        return Object.entries(monthlyStats).map(([month, count]) => ({
            month,
            count
        }));
    }

    prepareGraphData(donationReport, borrowingReport) {
        // Prepare data for charts
        const months = [];
        const donationCounts = [];
        const borrowingCounts = [];
        
        // Get all months from both reports
        const allMonths = new Set([
            ...donationReport.monthlyStats.map(stat => stat.month),
            ...borrowingReport.monthlyStats.map(stat => stat.month)
        ]);
        
        // Sort months chronologically
        const sortedMonths = Array.from(allMonths).sort();
        
        // Build data arrays for charts
        sortedMonths.forEach(month => {
            months.push(moment(month).format('MMM YYYY'));
            
            // Find donation count for this month
            const donationStat = donationReport.monthlyStats.find(stat => stat.month === month);
            donationCounts.push(donationStat ? donationStat.count : 0);
            
            // Find borrowing count for this month
            const borrowingStat = borrowingReport.monthlyStats.find(stat => stat.month === month);
            borrowingCounts.push(borrowingStat ? borrowingStat.count : 0);
        });
        
        return {
            labels: months,
            datasets: [
                {
                    label: 'Donations',
                    data: donationCounts
                },
                {
                    label: 'Borrowings',
                    data: borrowingCounts
                }
            ]
        };
    }
}

module.exports = ReportService;