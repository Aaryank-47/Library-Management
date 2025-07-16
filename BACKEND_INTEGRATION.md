# Smriti Pustakalaya Admin Dashboard — Backend Integration Guide

**Last updated:** 2025-07-14

---

## Overview
This document provides all the information the backend development team needs to ensure full integration of the Smriti Pustakalaya React admin dashboard. It covers required API endpoints, data contracts, authentication, and integration points for a seamless, dynamic, and robust admin experience.

---

## 1A. API Integration Points in the Codebase

Below is a summary of all locations in the frontend codebase where API integration is currently implemented or required. For each, the filename, endpoint, HTTP method, and purpose are listed. Please keep this section in sync with the detailed endpoint contracts below.

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `BookDirectory.js` | `/api/books` | GET | Fetch all books from backend |
| `BookDirectory.js` | `/api/books/:isbn/donators` | GET | Fetch all donators for a specific book by ISBN |
| `Dashboard.js` | `/api/books` | GET | Fetch all books for dashboard statistics |
| `DonationManagement.js` | `/api/donations/verify` | POST | Verify a donation (send donation data) |
| `DonationManagement.js` | `/api/donations/:id` | DELETE | Delete a donation by ID |
| `EmployeeManagement.js` | `/api/employees` | POST | Add a new employee |
| `EmployeeManagement.js` | `/api/employees/reset-password` | POST | Reset an employee's password |
| `EmployeeManagement.js` | `/api/employees/:id` | DELETE | Delete an employee |
| `LoginPage.js` | `/api/admin/login` | POST | Authenticate admin user and retrieve token |

> **Note:** Some endpoints in this table may differ in path or method from the backend contract below. Adjust either the code or backend as needed for consistency.

---

## 1. Required API Endpoints

### 1.1. Dashboard
- **GET `/api/stats`**
  - Returns: `{ totalDonations, totalBooks, totalOnlineDonations, ... }`
- **GET `/api/donations?recent=true`**
  - Returns: Array of recent donation objects (see data contract below)

### 1.2. Donations Management
- **GET `/api/donations`**
  - Returns: All donation records
- **POST `/api/donations`**
  - Body: New donation object (see contract)
- **DELETE `/api/donations/:id`**
  - Deletes a donation by ID
- **GET `/api/online-donations`**
  - Returns: All online donations pending verification
- **POST `/api/online-donations/:id/verify`**
  - Marks an online donation as verified

### 1.3. Inventory
- **GET `/api/books`**
  - Returns: All book records. Each book object **must** include a `type` field (e.g., "कहानी", "ज्ञानवर्धक", etc.).
  - The dashboard pie chart groups books by this `type` field and displays their counts.
- **GET `/api/book-types`**
  - Returns: Array of book type strings
- **POST `/api/books/:id/assign`**
  - Body: `{ location: string }`
  - Assigns a book to a location

### 1.4. Settings & Reports
- **POST `/api/change-password`**
  - Body: `{ oldPassword, newPassword }`
- **GET `/api/export`**
  - Returns: Downloadable PDF or CSV
- **POST `/api/feedback`**
  - Body: `{ message: string }`

---

## 1.5. Dashboard Pie Chart Integration
- The frontend fetches `/api/books` and automatically groups books by their `type` property to generate the dashboard pie chart.
- **Backend requirement:** Every book object returned by `/api/books` must have a `type` field with a user-friendly value in Hindi (e.g., "कहानी", "ज्ञानवर्धक", "बाल साहित्य", etc.).
- The `/api/pie-data` endpoint is no longer used or required.

---

## 2. Data Contracts (Sample JSON)

### Donation Object
```json
{
  "id": "string",
  "donor": "string",
  "mobile": "string",
  "address": "string",
  "books": "string",
  "type": "string", // Book type
  "date": "YYYY-MM-DD",
  "photo": "url-or-base64",
  "cert": "url-or-base64",
  "storage": "string",
  "certNumber": "string",
  "certIssueDate": "YYYY-MM-DD",
  "isOnline": true/false,
  "verified": true/false
}
```

### Pie Chart Data
```json
{
  "labels": ["Textbook", "Reference", "Novel", ...],
  "datasets": [
    {
      "data": [12, 7, 5],
      "backgroundColor": ["#...", "#...", "#..."]
    }
  ]
}
```

---

## 3. Authentication & Security
- Admin routes should be **protected** (JWT or session-based recommended).
- All endpoints must support CORS for requests from the frontend domain.
- Use environment variables for secrets and API base URLs.

---

## 4. File Uploads
- `photo` and `cert` fields in donations may be file uploads (image or PDF).
- Support multipart/form-data for relevant endpoints.
- Return accessible URLs for uploaded files.

---

## 5. Error Handling & Status Codes
- Return appropriate HTTP status codes (200, 201, 400, 401, 404, 500, etc.).
- On error, return `{ error: "Descriptive message" }`.

---

## 6. Integration Points
- **Frontend expects all data as JSON.**
- Ensure all endpoints return data in the expected structure.
- Test with sample requests from the React frontend (see `/src/App.js` for integration logic).
- Support pagination if donation/book lists grow large.

---

## 7. Contact
For questions or clarifications, contact the frontend team or check `/src/components` for prop/data usage examples.

---

## 8. Node.js Backend Implementation Guidance

The following section provides practical advice and code samples for implementing all required features using Node.js (with Express.js):

### 8.1. Project Setup & Dependencies

Install these packages:
```bash
npm install express cors jsonwebtoken multer bcryptjs dotenv
```
- Use `express` for routing, `cors` for cross-origin requests, `jsonwebtoken` for JWT auth, `multer` for file uploads, `bcryptjs` for password hashing, and `dotenv` for environment variables.

### 8.2. Basic Express Server Skeleton
```js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploaded files
app.use('/uploads', express.static('uploads'));

// Import routers here
// app.use('/api/donations', require('./routes/donations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 8.3. Example Route Handler (GET Donations)
```js
app.get('/api/donations', async (req, res) => {
  // Fetch from DB
  const donations = await Donation.find();
  res.json(donations);
});
```

### 8.4. File Uploads with Multer
```js
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Usage in route:
app.post('/api/donations', upload.fields([{ name: 'photo' }, { name: 'cert' }]), async (req, res) => {
  const donationData = req.body;
  if (req.files.photo) donationData.photo = `/uploads/${req.files.photo[0].filename}`;
  if (req.files.cert) donationData.cert = `/uploads/${req.files.cert[0].filename}`;
  // Save donationData to DB
  res.status(201).json(donationData);
});
```

### 8.5. JWT Authentication Middleware
```js
const jwt = require('jsonwebtoken');
function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
// Usage: app.get('/api/protected', auth, handler)
```

### 8.6. CORS Setup
```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

### 8.7. Error Handling
Always return JSON errors:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});
```

### 8.8. Password Hashing Example
```js
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);
```

### 8.9. Example Data Structure
See section 2 above for the expected JSON contracts. Always return data in this shape.

### 8.10. Additional Tips
- Use `.env` for secrets and config.
- Use async/await for DB operations.
- Paginate large lists (e.g., with `?page=1&size=50`).
- Return URLs for uploaded files.
- Protect all admin routes with authentication.

---

## 9. Backend Developer Task Checklist for This Project

Below is a clear, actionable checklist of what needs to be implemented on the backend for full integration with the Smriti Pustakalaya admin dashboard frontend:

### 9.1. API Endpoints
- [ ] `GET /api/stats` — Return dashboard summary stats.
- [ ] `GET /api/donations?recent=true` — Return recent donations for dashboard.
- [ ] `GET /api/pie-data` — Aggregate donations by type and return pie chart data.
- [ ] `GET /api/donations` — List all donations.
- [ ] `POST /api/donations` — Add a new donation (handle file uploads for photo/cert).
- [ ] `DELETE /api/donations/:id` — Delete a donation by ID.
- [ ] `GET /api/online-donations` — List online donations pending verification.
- [ ] `POST /api/online-donations/:id/verify` — Mark an online donation as verified.
- [ ] `GET /api/books` — List all books in inventory.
- [ ] `GET /api/book-types` — List all book types.
- [ ] `POST /api/books/:id/assign` — Assign a book to a location.
- [ ] `POST /api/change-password` — Allow admin password change.
- [ ] `GET /api/export` — Provide downloadable PDF/CSV report.
- [ ] `POST /api/feedback` — Accept admin feedback.

### 9.2. Data Aggregation Example (Pie Chart)
- Aggregate donations by `type` (e.g., Textbook, Reference, Novel, etc.).
- Return JSON:
  ```json
  {
    "labels": ["Textbook", "Reference", "Novel"],
    "datasets": [{ "data": [12, 7, 5], "backgroundColor": ["#60a5fa", "#facc15", "#f472b6"] }]
  }
  ```
- See section 8.4 for a Node.js/MongoDB aggregation example.

### 9.3. File Upload Handling
- Use `multer` for Express.js to handle `photo` and `cert` uploads in `/api/donations`.
- Store files in `/uploads` and return accessible URLs in the response.

### 9.4. Authentication
- Implement JWT-based (or session) authentication for all admin routes.
- Protect endpoints so only logged-in admins can access them.

### 9.5. CORS & Security
- Enable CORS for the frontend domain (e.g., `http://localhost:3000`).
- Use environment variables for secrets and DB connection strings.

### 9.6. Data Contracts
- Return JSON data in the shapes described in section 2 (donation object, pie chart data, etc.).
- Return proper HTTP status codes and error messages as JSON.

### 9.7. Integration & Testing
- Test all endpoints using Postman or curl.
- Confirm the frontend can:
  - Fetch and display all data (stats, donations, books, pie chart, etc.).
  - Add, delete, and verify donations.
  - Upload and retrieve files.
  - Assign books to locations.
  - Change password and submit feedback.
- Make sure all endpoints are robust and handle errors gracefully.

### 9.8. Optional Enhancements
- Add pagination for large lists (`/api/donations`, `/api/books`).
- Add logging and monitoring for API usage and errors.
- Consider rate limiting and input validation for security.

---

**Thank you!**

This guide ensures the backend team can deliver all required endpoints and data for a smooth, dynamic admin dashboard experience.
