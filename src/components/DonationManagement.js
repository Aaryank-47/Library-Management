import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "./Tabs";





export default function DonationManagement({
  donations = [],
  bookTypes = [],
  onAddDonation,
  onDeleteDonation,
  loading = false,
  onlineDonations = [],
  // API INTEGRATION: POST /api/donations/verify - Verify a donation (send donation data)
onVerifyDonation = () => {}
}) {
  const [expandedDonorId, setExpandedDonorId] = useState(null);
  const [actualDonations, setActualDonations] = useState(donations && donations.length > 0 ? donations : []);
  const [verifyModalDonation, setVerifyModalDonation] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    donor: "",
    mobile: "",
    address: "",
    books: "",
    type: bookTypes[0] || "",
    date: "",
    photo: null,
    storage: ""
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let booksValue = form.books;
    let booksArr = [];
    // Try to parse as JSON array
    try {
      if (typeof booksValue === 'string' && booksValue.trim().startsWith('[')) {
        booksArr = JSON.parse(booksValue);
      } else if (Array.isArray(booksValue)) {
        booksArr = booksValue;
      } else if (typeof booksValue === 'string') {
        booksArr = booksValue.split(',').map(b => ({ name: b.trim(), author: '', isbn: '', publisher: '', genre: '' })).filter(b => b.name);
      }
    } catch {
      booksArr = [];
    }
    const newDonation = {
      ...form,
      id: Date.now(),
      books: booksArr
    };
    setActualDonations(prev => [...prev, newDonation]);
    if (onAddDonation) onAddDonation(newDonation);
    setForm({
      donor: "",
      mobile: "",
      address: "",
      books: "",
      type: bookTypes[0] || "",
      date: "",
      photo: null,
      storage: ""
    });
  };

  if (loading) return <div>लोड हो रहा है...</div>;

  return (
    <div>
      <Tabs
        tabs={["दान देखें/सत्यापित करें"]}
        active={0}
        onTabChange={() => {}}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow mt-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4">दानकर्ता</th>
              <th className="py-2 px-4">मोबाइल</th>
              <th className="py-2 px-4">किताबों की संख्या</th>
              <th className="py-2 px-4">प्रकार</th>
              <th className="py-2 px-4">तिथि</th>
              <th className="py-2 px-4">पुस्तक का गंतव्य</th>
              
              <th className="py-2 px-4">कार्रवाई</th>
            </tr>
          </thead>
          <tbody>
            {actualDonations.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-4 text-gray-400">कोई दान नहीं मिला।</td></tr>
            ) : actualDonations.map(donation => (
              <React.Fragment key={donation.id}>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <button
                      className={`w-full text-left font-semibold text-blue-700 rounded hover:underline underline-offset-4 focus:outline-none ${expandedDonorId === donation.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setExpandedDonorId(expandedDonorId === donation.id ? null : donation.id)}
                    >
                      {donation.donor}
                    </button>
                  </td>
                  <td className="py-2 px-4">{donation.mobile}</td>
                  <td className="py-2 px-4">{
                    Array.isArray(donation.books)
                      ? donation.books.length
                      : (donation.books ? donation.books.split(',').filter(b => b.trim()).length : 0)
                  }</td>
                  <td className="py-2 px-4">{donation.type}</td>
                  <td className="py-2 px-4">{donation.date}</td>
                  <td className="py-2 px-4">{donation.storage}</td>
                  
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                      onClick={() => setVerifyModalDonation(donation)}
                    >
                      Verify
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:scale-105 transition-transform duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => // API INTEGRATION: DELETE /api/donations/:id - Delete a donation by ID
onDeleteDonation && onDeleteDonation(donation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedDonorId === donation.id && (
                  <tr>
                    <td colSpan={8} className="p-0">
                      <div className="bg-blue-50 border-l-4 border-blue-300 rounded-b-lg shadow-inner p-4">
                        <div className="font-bold text-blue-700 mb-2">डोनेट की गई किताबें:</div>
<div className="flex items-center gap-2 mb-4">
  <label className="font-semibold">गंतव्य बदलें:</label>
  <input
    type="text"
    className="border rounded px-2 py-1"
    value={donation.storage || ''}
    onChange={e => {
      setActualDonations(prev => prev.map(d => d.id === donation.id ? { ...d, storage: e.target.value } : d));
    }}
    placeholder="नया गंतव्य"
  />
</div>
                        <table className="min-w-full text-sm bg-white rounded">
                          <thead>
                            <tr className="bg-blue-100">
                              <th className="py-2 px-2 text-left">पुस्तक का नाम</th>
                              <th className="py-2 px-2 text-left">लेखक</th>
                              <th className="py-2 px-2 text-left">ISBN</th>
                              <th className="py-2 px-2 text-left">प्रकाशक</th>
                              <th className="py-2 px-2 text-left">श्रेणी</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              // Try to parse books as array of objects, else as comma-separated string
                              let books = [];
                              if (Array.isArray(donation.books)) {
                                books = donation.books;
                              } else if (typeof donation.books === 'string') {
                                // Demo: comma-separated book names only
                                books = donation.books.split(',').map((b, i) => ({
                                  name: b.trim(),
                                  author: '',
                                  isbn: '',
                                  publisher: '',
                                  genre: ''
                                })).filter(b => b.name);
                              }
                              if (books.length === 0) {
                                return <tr><td colSpan={5} className="text-center text-gray-500 py-2">कोई किताब नहीं मिली।</td></tr>;
                              }
                              return books.map((book, idx) => (
                                <tr key={book.isbn || book.name || idx}>
                                  <td className="py-1 px-2">{book.name}</td>
                                  <td className="py-1 px-2">{book.author}</td>
                                  <td className="py-1 px-2">{book.isbn}</td>
                                  <td className="py-1 px-2">{book.publisher}</td>
                                  <td className="py-1 px-2">{book.genre}</td>
                                </tr>
                              ));
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {verifyModalDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setVerifyModalDonation(null)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">पुस्तक दान सत्यापित करें</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-shrink-0">
                  {verifyModalDonation.photo ? (
                    <img src={verifyModalDonation.photo} alt="Book" className="w-32 h-32 object-cover rounded border" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded border text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  {/* NOTE: No 'title' field in donation data; adjust as needed */}
                  <div><span className="font-semibold">Title:</span> -</div>
                  <div><span className="font-semibold">ISBN:</span> {verifyModalDonation.isbn || '-'}</div>
                  <div><span className="font-semibold">Condition:</span> {verifyModalDonation.condition || '-'}</div>
                  <div><span className="font-semibold">Destination of Book:</span> {verifyModalDonation.storage || '-'}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="font-semibold">गंतव्य बदलें:</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      value={verifyModalDonation.storage || ''}
                      onChange={e => {
                        setVerifyModalDonation({ ...verifyModalDonation, storage: e.target.value });
                        setActualDonations(prev => prev.map(d => d.id === verifyModalDonation.id ? { ...d, storage: e.target.value } : d));
                      }}
                      placeholder="नया गंतव्य"
                    />
                  </div>
                  <div><span className="font-semibold">Donor:</span> {verifyModalDonation.donor || '-'}</div>
                  <div><span className="font-semibold">Date:</span> {verifyModalDonation.date || '-'}</div>
                </div>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  // Call backend API to verify book (to be implemented)
                  setVerifyModalDonation(null);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-1 font-semibold">Verification Status</label>
                  <select className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                    <option value="">Select status</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Comments</label>
                  <textarea className="input h-20" placeholder="Optional comments for verification..." />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setVerifyModalDonation(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:scale-105 transition-transform duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

DonationManagement.propTypes = {
  donations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      donor: PropTypes.string,
      mobile: PropTypes.string,
      address: PropTypes.string,
      books: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
      type: PropTypes.string,
      date: PropTypes.string,
      photo: PropTypes.any,
      storage: PropTypes.string
    })
  ),
  onlineDonations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      donor: PropTypes.string,
      mobile: PropTypes.string,
      books: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      type: PropTypes.string,
      date: PropTypes.string
    })
  ),
  onVerifyDonation: PropTypes.func,
  bookTypes: PropTypes.arrayOf(PropTypes.string),
  onAddDonation: PropTypes.func,
  onDeleteDonation: PropTypes.func,
  loading: PropTypes.bool
};
