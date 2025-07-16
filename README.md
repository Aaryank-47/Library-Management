# 📚 Pustakalay - Library Management System

A beautiful and user-friendly React Native app for managing book donations in a library community.

## ✨ Features

### 🏠 Home Dashboard
- **Welcome message** with user's name
- **Statistics cards** showing total books donated, accepted, and in review
- **Quick donate button** for easy access
- **Recent donation activity** with status indicators

### 📖 Donate Book Form
- **Book title and author** input fields
- **Genre selection** with dropdown (Fiction, Non-Fiction, Science Fiction, etc.)
- **Book condition** selection (New, Used - Good, Used - Poor)
- **Optional image URL** for book cover
- **Form validation** and success feedback
- **Donation guidelines** information card

### 📋 My Donations
- **Complete list** of all donated books
- **Status tracking** (Accepted, In Review, Rejected)
- **Book details** (title, author, genre, condition, date)
- **Edit and delete** functionality for donations
- **Color-coded status badges** for easy identification

### 👤 User Profile
- **Personal information** management (name, email, phone, address, city)
- **Edit mode** with form validation
- **Donation certificate** download and view options
- **App settings** section with navigation options

## 🎨 Design Features

- **Modern UI** with clean, professional design
- **Responsive layout** that works on all screen sizes
- **Color-coded status indicators** for easy recognition
- **Smooth animations** and transitions
- **Intuitive navigation** with bottom tabs
- **Beautiful icons** from Ionicons
- **Card-based layout** for better organization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PustakalayApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press 'a' for Android or 'i' for iOS

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
│   ├── HomeScreen.tsx      # Dashboard
│   ├── DonateBookScreen.tsx # Donation form
│   ├── MyDonationsScreen.tsx # Donations list
│   └── ProfileScreen.tsx    # User profile
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation between screens
- **Ionicons** - Beautiful icon library
- **React Native Vector Icons** - Additional icon support

## 📊 Mock Data

The app includes realistic mock data for demonstration:
- **User profile**: Rahul Sharma with contact information
- **Sample donations**: 4 books with different statuses
- **Various genres**: Fiction, Science Fiction, Romance
- **Different conditions**: New, Used - Good, Used - Poor

## 🎯 Key Features

### For Donors
- ✅ Easy book donation process
- ✅ Track donation status
- ✅ View donation history
- ✅ Download certificates
- ✅ Edit personal information

### For Library Staff
- ✅ Review donation submissions
- ✅ Update donation status
- ✅ Manage donor information
- ✅ Generate certificates

## 🔮 Future Enhancements

- **Backend integration** with real API
- **Image upload** functionality
- **Push notifications** for status updates
- **Offline support** with local storage
- **Multi-language support**
- **Advanced search and filtering**
- **Donation analytics** and reports

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the library community** 