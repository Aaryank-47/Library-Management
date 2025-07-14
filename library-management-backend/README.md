# Library Management Backend

This project is a backend application for managing a library system. It allows users to view available books, donate books, and borrow books, while providing an admin interface for managing users, books, and transactions.

## Features

- **User Authentication**: Users can log in and log out.
- **Admin Authentication**: Admins can log in and log out.
- **Book Management**: Users can upload books with details, and admins can approve these uploads.
- **Transaction Recording**: Admins can record user details and the time of book donations and borrowings.
- **Certificate Generation**: Users who donate books receive certificates.
- **Graphical Reports**: Admins can view graphs for donated and borrowed books.
- **File Uploads**: Admins can upload PDF versions of books.

## Project Structure

```
library-management-backend
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── server.js
├── uploads
│   ├── books
│   └── certificates
├── .env.example
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd library-management-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the server:
   ```
   npm start
   ```

## Usage

- Access the API endpoints for user and admin functionalities.
- Use tools like Postman to test the API routes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.