class TransactionService {
    constructor(transactionModel, userModel, bookModel) {
        this.transactionModel = transactionModel;
        this.userModel = userModel;
        this.bookModel = bookModel;
    }

    async recordDonation(userId, bookId) {
        const transaction = await this.transactionModel.create({
            userId,
            bookId,
            type: 'donation',
            date: new Date()
        });
        return transaction;
    }

    async recordBorrowing(userId, bookId) {
        const transaction = await this.transactionModel.create({
            userId,
            bookId,
            type: 'borrowing',
            date: new Date()
        });
        return transaction;
    }

    async getUserTransactions(userId) {
        const transactions = await this.transactionModel.find({ userId });
        return transactions;
    }

    async getAllTransactions() {
        const transactions = await this.transactionModel.find();
        return transactions;
    }

    async generateReport() {
        const donations = await this.transactionModel.find({ type: 'donation' });
        const borrowings = await this.transactionModel.find({ type: 'borrowing' });
        return {
            totalDonations: donations.length,
            totalBorrowings: borrowings.length,
            donations,
            borrowings
        };
    }
}

module.exports = TransactionService;