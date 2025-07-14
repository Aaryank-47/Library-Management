class BookService {
    constructor(bookModel, transactionModel) {
        this.bookModel = bookModel;
        this.transactionModel = transactionModel;
    }

    async getAllBooks() {
        try {
            return await this.bookModel.find({});
        } catch (error) {
            throw new Error('Error fetching books: ' + error.message);
        }
    }

    async donateBook(bookDetails) {
        try {
            const newBook = new this.bookModel(bookDetails);
            await newBook.save();
            return newBook;
        } catch (error) {
            throw new Error('Error donating book: ' + error.message);
        }
    }

    async borrowBook(bookId, userId) {
        try {
            const book = await this.bookModel.findById(bookId);
            if (!book) {
                throw new Error('Book not found');
            }

            const transaction = new this.transactionModel({
                bookId,
                userId,
                type: 'borrow',
                date: new Date()
            });

            await transaction.save();
            return transaction;
        } catch (error) {
            throw new Error('Error borrowing book: ' + error.message);
        }
    }

    async returnBook(transactionId) {
        try {
            const transaction = await this.transactionModel.findById(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            transaction.returned = true;
            await transaction.save();
            return transaction;
        } catch (error) {
            throw new Error('Error returning book: ' + error.message);
        }
    }

    async getBookDetails(bookId) {
        try {
            return await this.bookModel.findById(bookId);
        } catch (error) {
            throw new Error('Error fetching book details: ' + error.message);
        }
    }
}

export default BookService;