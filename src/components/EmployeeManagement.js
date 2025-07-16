import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * EmployeeManagement component
 * - Add new employees (user ID and password)
 * - List existing employees (no mock data, ready for backend integration)
 * - Reset password and delete employee actions (handlers prepared for backend)
 */


export default function EmployeeManagement({ employees, // API INTEGRATION:
// POST /api/employees - Add a new employee
// POST /api/employees/reset-password - Reset an employee's password
// DELETE /api/employees/:id - Delete an employee
onAddEmployee, onResetPassword, onDeleteEmployee, loading = false }) {
  const actualEmployees = employees && employees.length > 0 ? employees : [];
  const [form, setForm] = useState({ userId: "", password: "" });
  const [showForm, setShowForm] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [changePwForm, setChangePwForm] = useState({ changeUserId: "", newPassword: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onAddEmployee) onAddEmployee(form);
    setForm({ userId: "", password: "" });
    setShowForm(false);
  };

  return (
    <>
      {/* Employee Stats */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600">{actualEmployees ? actualEmployees.length : 0}</div>
          <div className="text-gray-600 mt-1">कुल कर्मचारी</div>
        </div>
        {/* Add more stats here if needed */}
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">कर्मचारी प्रबंधन</h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-150 shadow"
            onClick={() => setShowForm(s => !s)}
          >
            {showForm ? "रद्द करें" : "कर्मचारी जोड़ें"}
          </button>
          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-150 shadow"
            onClick={() => setShowChangePw(true)}
          >
            पासवर्ड बदलें
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowChangePw(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">पासवर्ड बदलें</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                // Call backend API to change password (to be implemented)
                setShowChangePw(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-semibold text-gray-700">User ID</label>
                <input
                  name="changeUserId"
                  value={changePwForm.changeUserId}
                  onChange={e => setChangePwForm(f => ({ ...f, changeUserId: e.target.value }))}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">नया पासवर्ड</label>
                <input
                  name="newPassword"
                  type="password"
                  value={changePwForm.newPassword}
                  onChange={e => setChangePwForm(f => ({ ...f, newPassword: e.target.value }))}
                  className="input"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowChangePw(false)}
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-150 shadow"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showForm && (
        <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">User ID</label>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-150 shadow">Add</button>
          </div>
        </form>
      )}
      <div>
        <h3 className="font-semibold mb-3 text-gray-700">कर्मचारी</h3>
        {loading ? (
          <div className="text-gray-500 py-4">Loading...</div>
        ) : (!actualEmployees || actualEmployees.length === 0) ? (
          <div className="text-gray-400 py-4">कोई कर्मचारी नहीं मिला.</div>
        ) : (
          <table className="min-w-full text-sm mt-2 border rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left font-semibold text-gray-700">User ID</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {actualEmployees.map(emp => (
                <tr key={emp.id} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{emp.userId}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors duration-150 shadow"
                      onClick={() => onResetPassword && onResetPassword(emp.id)}
                    >
                      पासवर्ड रीसेट करें
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-150 shadow"
                      onClick={() => onDeleteEmployee && onDeleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`
        .input {
          @apply border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400;
        }
      `}</style>
    </div>
  </>);

}

EmployeeManagement.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      userId: PropTypes.string
    })
  ),
  onAddEmployee: PropTypes.func,
  onResetPassword: PropTypes.func,
  onDeleteEmployee: PropTypes.func,
  loading: PropTypes.bool
};
