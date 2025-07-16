# API Integration Points in Smriti Pustakalaya

**Last updated:** 2025-07-15

This document summarizes all locations in the frontend codebase where API integration is currently implemented or required. For each, the filename, endpoint, HTTP method, and purpose are listed. Please keep this section in sync with the detailed endpoint contracts in `BACKEND_INTEGRATION.md`.

---

## API Integration Points (Narrative)
p
This document provides a detailed, section-by-section explanation of every API integration point in the Smriti Pustakalaya frontend codebase. Each section describes where the integration occurs, the endoint and HTTP method, and the specific purpose and usage in the code. 

> **Note:** Keep this file in sync with `BACKEND_INTEGRATION.md` to ensure consistency between frontend and backend development.

---

### 1. BookDirectory.js

#### a) Fetch All Books
- **Endpoint:** `/api/books`
- **Method:** GET
- **Usage:** In the `BookDirectory` component, this endpoint is called to retrieve the complete list of books from the backend. The data is fetched when the component mounts or refreshes, and is used to display the book directory to the admin user. It replaces any previous use of mock or static data.

#### b) Fetch Donators by Book ISBN
- **Endpoint:** `/api/books/:isbn/donators`
- **Method:** GET
- **Usage:** When a user expands a book row to view its donators, this endpoint is called with the selected book's ISBN. The response provides a list of all donators for that specific book, enabling detailed donor information to be shown on demand.

---

### 2. Dashboard.js

#### a) Fetch Books for Statistics
- **Endpoint:** `/api/books`
- **Method:** GET
- **Usage:** The dashboard fetches all books to build statistical visualizations, such as pie charts grouped by book type. This helps the admin understand the distribution of books in the library.

---

### 3. DonationManagement.js

#### a) Verify a Donation
- **Endpoint:** `/api/donations/verify`
- **Method:** POST
- **Usage:** When an admin verifies a donation, this endpoint is called with the relevant donation data. The backend processes the verification, and the UI updates to reflect the verified status.

#### b) Delete a Donation
- **Endpoint:** `/api/donations/:id`
- **Method:** DELETE
- **Usage:** To remove a donation record, this endpoint is called with the donation's unique ID. Upon successful deletion, the donation is removed from the UI list.

---

### 4. EmployeeManagement.js

#### a) Add a New Employee
- **Endpoint:** `/api/employees`
- **Method:** POST
- **Usage:** This endpoint is called when adding a new employee. The admin provides the required details, and the backend creates a new employee record.

#### b) Reset Employee Password
- **Endpoint:** `/api/employees/reset-password`
- **Method:** POST
- **Usage:** When an admin needs to reset an employee's password, this endpoint is called with the employee's details. The backend handles the password reset process securely.

#### c) Delete an Employee
- **Endpoint:** `/api/employees/:id`
- **Method:** DELETE
- **Usage:** To remove an employee from the system, this endpoint is called with the employee's unique ID. The employee is deleted from the backend and the change is reflected in the frontend.

---

### 5. LoginPage.js

#### a) Admin Login
- **Endpoint:** `/api/admin/login`
- **Method:** POST
- **Usage:** This endpoint is called when an admin submits the login form. The backend verifies credentials and returns an authentication token, which is then stored in local storage for subsequent authenticated requests.

---


For more details on request/response contracts, see `BACKEND_INTEGRATION.md`.
