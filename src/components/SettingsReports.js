import React, { useState } from "react";
import PropTypes from "prop-types";

export default function SettingsReports({
  onChangePassword,
  onExportExcel,
  onExportPDF,
  loading = false
}) {
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notes, setNotes] = useState("");

  const handlePasswordChange = e => {
    e.preventDefault();
    if (onChangePassword) onChangePassword(password);
    setPassword("");
  };

  if (loading) return <div>लोड हो रहा है...</div>;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">दान डेटा निर्यात करें</h2>
        <button
          onClick={onExportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-150 shadow-md transform transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          एक्सेल के रूप में निर्यात करें
        </button>
        <button
          onClick={onExportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-150 shadow-md transform transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          पीडीएफ के रूप में निर्यात करें
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">प्रतिक्रिया और नोट्स</h2>
        <textarea
          className="input h-24"
          placeholder="अपनी प्रतिक्रिया लिखें..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <textarea
          className="input h-24 mt-2"
          placeholder="आंतरिक नोट्स..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <style>{`
        .input {
          @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400;
        }
      `}</style>
    </div>
  );
}

SettingsReports.propTypes = {
  onChangePassword: PropTypes.func,
  onExportExcel: PropTypes.func,
  onExportPDF: PropTypes.func,
  loading: PropTypes.bool
};
