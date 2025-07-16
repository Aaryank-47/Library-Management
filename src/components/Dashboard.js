import React from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import "./registerChartJS";



function getValidPieData(customPieData, fallbackPieData) {
  // Check for a valid datasets array with data
  const isValid = d => d && Array.isArray(d.labels) && d.labels.length > 0 && Array.isArray(d.datasets) && d.datasets.length > 0 && Array.isArray(d.datasets[0].data);
  if (isValid(customPieData)) return customPieData;
  if (isValid(fallbackPieData)) return fallbackPieData;
  // Fallback to a dummy chart
  return {
    labels: ["कहानी", "ज्ञानवर्धक", "बाल साहित्य"],
    datasets: [{
      data: [10, 5, 7],
      backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
    }]
  };
}

export default function Dashboard({
  stats = {},
  recentDonations = [],
  loading = false,
  onAddDonation
}) {
  const [pieData, setPieData] = React.useState(null);
  const [loadingPie, setLoadingPie] = React.useState(true);

  React.useEffect(() => {
    async function fetchBooksAndBuildPie() {
      setLoadingPie(true);
      try {
        // API INTEGRATION: GET /api/books - Fetch all books for dashboard statistics
const res = await fetch("/api/books");
        const books = await res.json();
        // Group books by type
        const typeCounts = {};
        books.forEach(b => {
          const type = b.type || "अन्य";
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        const labels = Object.keys(typeCounts);
        const data = labels.map(l => typeCounts[l]);
        setPieData({
          labels,
          datasets: [{
            data,
            backgroundColor: [
              "#36A2EB", "#FFCE56", "#FF6384", "#8BC34A", "#E91E63", "#FFC107", "#00BCD4", "#9C27B0"
            ]
          }]
        });
      } catch (e) {
        setPieData(null);
      } finally {
        setLoadingPie(false);
      }
    }
    fetchBooksAndBuildPie();
  }, []);

  if (loading) return <div>लोड हो रहा है...</div>;
  return (
    <div className="space-y-8">
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600">{stats.totalBooks ?? "-"}</div>
          <div className="text-gray-600 mt-2">कुल पुस्तकें</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-green-600">{stats.totalDonors ?? "-"}</div>
          <div className="text-gray-600 mt-2">कुल दानकर्ता</div>
        </div>

      </div>

      {/* Recent Donations & Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Table */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">हाल की दान प्रविष्टियाँ</h2>
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left">दानकर्ता का नाम</th>
                <th className="py-2 px-4 text-left">पुस्तकों की संख्या</th>
                <th className="py-2 px-4 text-left">प्रकार</th>
                <th className="py-2 px-4 text-left">तिथि</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-gray-400">कोई डेटा नहीं</td></tr>
              ) : recentDonations.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{row.name}</td>
                  <td className="py-2 px-4">{row.books}</td>
                  <td className="py-2 px-4">{row.type}</td>
                  <td className="py-2 px-4">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center w-full">
          <h2 className="section-title mb-4">पुस्तक प्रकार</h2>
          <div className="mb-4 text-gray-700 font-semibold">डैशबोर्ड का पाई चार्ट (पुस्तक प्रकार अनुसार)</div>
          {loadingPie ? (
            <div>लोड हो रहा है...</div>
          ) : pieData && pieData.labels.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <div>कोई पुस्तक डेटा उपलब्ध नहीं।</div>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  stats: PropTypes.shape({
    totalBooks: PropTypes.number,
    totalDonors: PropTypes.number
  }),
  recentDonations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      books: PropTypes.number,
      type: PropTypes.string,
      date: PropTypes.string
    })
  ),
  pieData: PropTypes.object,
  loading: PropTypes.bool,
  onAddDonation: PropTypes.func
};
