module.exports = {
    validateUserInput: (data) => {
        const errors = {};
        if (!data.username || data.username.trim() === '') {
            errors.username = 'Username is required';
        }
        if (!data.password || data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    },

    validateBookData: (data) => {
        const errors = {};
        if (!data.title || data.title.trim() === '') {
            errors.title = 'Book title is required';
        }
        if (!data.author || data.author.trim() === '') {
            errors.author = 'Author name is required';
        }
        if (!data.isbn || data.isbn.trim() === '') {
            errors.isbn = 'ISBN is required';
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    },

    validateCertificateData: (data) => {
        const errors = {};
        if (!data.userId || data.userId.trim() === '') {
            errors.userId = 'User ID is required';
        }
        if (!data.bookId || data.bookId.trim() === '') {
            errors.bookId = 'Book ID is required';
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }
};