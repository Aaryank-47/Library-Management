import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "./Tabs";





export default function Inventory({
  actualBooks,
  actualDestinationOfBooks = [],
  onAssignBook,
  loading = false
}) {
  const books = actualBooks;
  const destinations = actualDestinationOfBooks;
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("");

  if (loading) return <div>लोड हो रहा है...</div>;

  return (
    <div>
      <Tabs
        tabs={["सभी पुस्तकें", "गंतव्य अनुसार पुस्तक संग्रह"]}
        active={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <input
              placeholder="शीर्षक या स्थिति से छाँटें..."
              className="input max-w-xs"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4">पुस्तक का नाम</th>
                <th className="py-2 px-4">स्थिति</th>
                <th className="py-2 px-4">पुस्तक का गंतव्य</th>
                <th className="py-2 px-4">आवंटित करें</th> 
              </tr>
            </thead>
            <tbody>
              {(!books || books.length === 0) ? (
                <tr><td colSpan={4} className="text-center py-4 text-gray-400">कोई पुस्तक नहीं मिली। यहाँ पुस्तकें तब दिखाई देंगी जब वे सिस्टम में जोड़ी जाएँगी।</td></tr>
              ) : books.map(b => (
                  <tr key={b.id} className="border-b">
                    <td className="py-2 px-4">{b.title}</td>
                    <td className="py-2 px-4">{b.status}</td>
                    <td className="py-2 px-4">{b.destinationOfBook}</td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        className="input bg-blue-50 border border-blue-300 text-gray-800 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={b.destinationOfBook}
                        onChange={e => onAssignBook && onAssignBook(b.id, e.target.value)}
                        disabled={b.status === "आवंटित"}
                        placeholder="गंतव्य दर्ज करें"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 1 && (
        <div className="bg-white p-4 rounded shadow">
          {destinations.map(loc => (
            <div key={loc} className="mb-6">
              <h3 className="font-semibold text-blue-700 mb-2">{loc}</h3>
              <ul className="list-disc ml-6">
                {books.filter(b => b.destinationOfBook === loc).length === 0 ? (
                  <li className="text-gray-400">कोई पुस्तक नहीं</li>
                ) : (
                  books
                    .filter(b => b.destinationOfBook === loc)
                    .map(b => (
                      <li key={b.id}>{b.title} <span className="text-xs text-gray-500">({b.status})</span></li>
                    ))
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .input {
          @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400;
        }
      `}</style>
    </div>
  );
}

Inventory.propTypes = {
  actualBooks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      status: PropTypes.string,
      destinationOfBook: PropTypes.string
    })
  ),
  actualDestinationOfBooks: PropTypes.arrayOf(PropTypes.string),
  onAssignBook: PropTypes.func,
  loading: PropTypes.bool
};
