# 📡 API Integration Guide

This document explains where and how API calls will be made in your app, what kind of API (GET/POST/PUT/DELETE) will be used, and their purpose.

---

## 1. LoginScreen
- **Login:**
  - **API:** `POST /login`
  - **Purpose:** User authentication.
  - **Location:** `handleLogin` function
- **Forgot Password:**
  - **API:** `POST /forgot-password`
  - **Purpose:** Send password reset link.
  - **Location:** `handleForgotPassword` function

---

## 2. DonateBookScreen
- **Submit Donation:**
  - **API:** `POST /donations`
  - **Purpose:** Submit a new book donation.
  - **Location:** `handleSubmit` function
- **Image Upload:**
  - **API:** `POST /upload`
  - **Purpose:** Upload book image to backend (if supported).
  - **Location:** `handleSubmit` function (before donation submission)

---

## 3. DonationsScreen
- **Fetch Donations List:**
  - **API:** `GET /donations`
  - **Purpose:** Get all donations for the user.
  - **Location:** useEffect (on component load)

---

## 4. DonationDetailsScreen
- **Fetch Donation Details:**
  - **API:** `GET /donations/:id`
  - **Purpose:** Get details for a specific donation.
  - **Location:** DonationDetailsScreen (if id is available in route params)
- **Fetch All Donations by Donor:**
  - **API:** `GET /donations?donorName=...`
  - **Purpose:** Get all donations by a specific donor (optional, if needed).

---

## 5. Future APIs
- **Edit Donation:**
  - **API:** `PUT /donations/:id`
  - **Purpose:** Edit an existing donation
- **Delete Donation:**
  - **API:** `DELETE /donations/:id`
  - **Purpose:** Remove a donation

---

## Integration Tips
- Use `fetch` or `axios` for API calls.
- Always use async/await and proper error handling.
- Don't forget to send authentication tokens for protected endpoints.

---

**If you need code examples for any specific API integration, just ask!** 