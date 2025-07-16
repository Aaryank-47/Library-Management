import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

const navItems = [
  { name: 'डैशबोर्ड', path: '/' },
  { name: 'दान', path: '/donations' },
  { name: 'संग्रह', path: '/inventory' },
  { name: 'कर्मचारी', path: '/employees' },
  { name: 'सेटिंग्स और रिपोर्ट्स', path: '/settings' },
  { name: 'पुस्तक निर्देशिका', path: '/book-directory' },
];

import LoginPage from './pages/LoginPage';
import EmployeeManagement from './components/EmployeeManagement';
import BookDirectoryPage from './pages/BookDirectoryPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogin = (credentials) => {
    // TODO: Replace with real authentication
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg hidden md:block bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'40\' height=\'40\' fill=\'%23f3f4f6\'/%3E%3Crect x=\'20\' y=\'20\' width=\'20\' height=\'20\' fill=\'%23d1d5db\'/%3E%3Crect x=\'0\' y=\'0\' width=\'40\' height=\'40\' fill=\'none\' stroke=\'%239ca3af\' stroke-width=\'1\'/%3E%3C/svg%3E')]">
                  <div className="p-6 font-bold text-2xl text-blue-700">स्मृति पुस्तकालय</div>
                  <nav className="space-y-2">
                    {navItems.map(item => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 my-1 border rounded-full shadow-sm font-semibold transition-colors duration-150
                          ${isActive ? 'bg-blue-50 border-blue-500 text-blue-800' : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-900'}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </aside>
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  {/* Topbar */}
                  <header className="topbar shadow-md px-4 py-3 flex items-center justify-between md:justify-end">
                    <div className="md:hidden font-bold text-blue-700">स्मृति पुस्तकालय</div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 text-sm">Admin</span>
                      <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" className="w-8 h-8 rounded-full" />
                    </div>
                  </header>
                  {/* Routed Pages */}
                  <main className="flex-1 p-6">
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/donations/*" element={<DonationManagementPage />} />
                      <Route path="/inventory/*" element={<InventoryPage />} />
                      <Route path="/employees" element={<EmployeeManagement />} />
                      <Route path="/settings/*" element={<SettingsReportsPage />} />
                      <Route path="/book-directory" element={<BookDirectoryPage />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
    </Router>
  );
}

import Dashboard from './components/Dashboard';
import Tabs from './components/Tabs';
import DonationManagement from './components/DonationManagement';
import Inventory from './components/Inventory';
import SettingsReports from './components/SettingsReports';

// --- Demo state for frontend only ---
const demoStats = { totalBooks: 0, totalDonors: 0, totalLocations: 0 };
const demoRecentDonations = [];
const demoPieData = {};
const demoDonations = [];
const demoBookTypes = [];
const demoBooks = [];
const demoLocations = [];

function DashboardPage() {
  // Backend devs: Replace demo* with real data from API
  const handleAddDonation = () => {
    alert('Show Add Donation Modal (to be implemented)');
  };
  return (
    <Dashboard
      stats={demoStats}
      recentDonations={demoRecentDonations}
      pieData={demoPieData}
      loading={false}
      onAddDonation={handleAddDonation}
    />
  );
}

function DonationManagementPage() {
  // Backend devs: Replace demo* with real data/handlers from API
  const handleAddDonation = donation => {
    alert('Backend: Add donation\n' + JSON.stringify(donation, null, 2));
  };
  const handleDeleteDonation = id => {
    alert('Backend: Delete donation id ' + id);
  };
  return (
    <DonationManagement
      donations={demoDonations}
      bookTypes={demoBookTypes}
      onAddDonation={handleAddDonation}
      onDeleteDonation={handleDeleteDonation}
      loading={false}
    />
  );
}

function InventoryPage() {
  // Backend devs: Replace demo* with real data/handlers from API
  const handleAssignBook = (id, location) => {
    alert('Backend: Assign book id ' + id + ' to ' + location);
  };
  return (
    <Inventory
      books={demoBooks}
      locations={demoLocations}
      onAssignBook={handleAssignBook}
      loading={false}
    />
  );
}

function SettingsReportsPage() {
  // Backend devs: Replace handlers with real implementations
  const handleChangePassword = password => {
    alert('Backend: Change password to ' + password);
  };
  const handleExportExcel = () => {
    alert('Backend: Export Excel');
  };
  const handleExportPDF = () => {
    alert('Backend: Export PDF');
  };
  return (
    <SettingsReports
      onChangePassword={handleChangePassword}
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
      loading={false}
    />
  );
}


export default App;
