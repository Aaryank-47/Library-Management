import React, { useEffect, useState } from "react";

// Set to true to use mock data
const USE_MOCK_DATA = true;

const mockBooks = [
  {
    name: "रामायण",
    isbn: "9788126706760",
    author: "गोस्वामी तुलसीदास",
    publisher: "साहित्य अकादमी",
    genre: "महाकाव्य"
  },
  {
    name: "महाभारत",
    isbn: "9788126706739",
    author: "व्यास",
    publisher: "भारतीय विद्या भवन",
    genre: "महाकाव्य"
  },
  {
    name: "गुनाहों का देवता",
    isbn: "9788170287627",
    author: "धर्मवीर भारती",
    publisher: "भारतीय ज्ञानपीठ",
    genre: "उपन्यास"
  },
  {
    name: "गोदान",
    isbn: "9788171780721",
    author: "मुंशी प्रेमचंद",
    publisher: "राजपाल एंड संस",
    genre: "उपन्यास"
  }
];

const mockDonatorsByIsbn = {
  "9788126706760": ["सुरेश कुमार", "रीता देवी"],
  "9788126706739": ["मनीषा सिंह"],
  "9788170287627": ["अजय वर्मा", "कविता जोशी"],
  "9788171780721": []
};

function BookDirectory() {
  const [books, setBooks] = useState([]);
  const [expandedIsbn, setExpandedIsbn] = useState(null);
  const [donators, setDonators] = useState({}); // { isbn: [donators] }
  const [loading, setLoading] = useState(true);
  const [loadingDonators, setLoadingDonators] = useState({}); // { isbn: true/false }

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      if (USE_MOCK_DATA) {
        setBooks([]);
        setLoading(false);
        return;
      }
      try {
        // API INTEGRATION: GET /api/books - Fetch all books from backend
const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (e) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleExpand = async (isbn) => {
    if (!isbn) return;
    if (donators[isbn]) {
      setExpandedIsbn(expandedIsbn === isbn ? null : isbn);
      return;
    }
    setLoadingDonators(ld => ({ ...ld, [isbn]: true }));
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        setDonators(d => ({ ...d, [isbn]: [] }));
        setExpandedIsbn(isbn);
        setLoadingDonators(ld => ({ ...ld, [isbn]: false }));
      }, 500);
      return;
    }
    try {
      // API INTEGRATION: GET /api/books/:isbn/donators - Fetch all donators for a specific book by ISBN
const res = await fetch(`/api/books/${isbn}/donators`);
      const data = await res.json();
      setDonators(d => ({ ...d, [isbn]: data }));
      setExpandedIsbn(isbn);
    } catch (e) {
      setDonators(d => ({ ...d, [isbn]: [] }));
      setExpandedIsbn(isbn);
    } finally {
      setLoadingDonators(ld => ({ ...ld, [isbn]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-0 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800">पुस्तक निर्देशिका</h2>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-blue-100">
          {loading ? (
            <div className="text-lg text-blue-600 font-semibold animate-pulse">लोड हो रहा है...</div>
          ) : (
            <table className="min-w-full rounded-xl overflow-hidden text-base">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-3 px-4 text-left font-bold text-blue-900">पुस्तक का नाम</th>
                  <th className="py-3 px-4 text-left font-bold text-blue-700">ISBN</th>
                  <th className="py-3 px-4 text-left font-bold text-blue-700">लेखक</th>
                  <th className="py-3 px-4 text-left font-bold text-blue-700">प्रकाशक</th>
                  <th className="py-3 px-4 text-left font-bold text-blue-700">श्रेणी</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, idx) => (
                  <React.Fragment key={book.isbn || book.id || idx}>
                    <tr
                      className={`transition-all duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 cursor-pointer`}
                      onClick={() => handleExpand(book.isbn)}
                    >
                      <td className="py-2 px-4">
                        <button
                          className="w-full text-left font-semibold text-blue-700 bg-blue-50 border border-blue-300 rounded-lg px-3 py-1 shadow-sm transition-colors duration-150 hover:text-blue-900 hover:underline underline-offset-4 focus:outline-none"
                        >
                          {book.name}
                        </button>
                      </td>
                      <td className="py-2 px-4 text-blue-700 font-mono">{book.isbn}</td>
                      <td className="py-2 px-4 text-blue-700">{book.author}</td>
                      <td className="py-2 px-4 text-blue-700">{book.publisher}</td>
                      <td className="py-2 px-4 text-blue-700">{book.genre}</td>
                    </tr>
                    {expandedIsbn === book.isbn && (
                      <tr>
                        <td colSpan={5} className="py-3 px-4">
                          <div className="flex items-start gap-3 bg-blue-50 rounded-lg border-l-4 border-blue-300 shadow-inner p-4">
                            <div>
                              {loadingDonators[book.isbn] ? (
                                <span className="text-blue-700 font-semibold animate-pulse">दानकर्ता लोड हो रहे हैं...</span>
                              ) : (
                                <>
                                  <span className="font-bold text-blue-700">दानकर्ता:</span>
                                  {donators[book.isbn] && donators[book.isbn].length > 0 ? (
                                    <ul className="list-disc ml-6 mt-1 text-blue-900">
                                      {donators[book.isbn].map((donor, i) => (
                                        <li key={i} className="py-0.5">{donor}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="ml-2 text-gray-600">कोई दानकर्ता जानकारी उपलब्ध नहीं।</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDirectory;
