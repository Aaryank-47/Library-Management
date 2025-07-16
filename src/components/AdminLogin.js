import React, { useState } from "react";
import PropTypes from "prop-types";


function AdminLogin({ onLogin, loading, error }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ loginId, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
      
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm border border-blue-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          प्रशासक लॉगिन
        </h2>
        <div className="mb-4">
          <label
            className="block text-blue-700 text-sm font-bold mb-2"
            htmlFor="loginId"
          >
            लॉगिन आईडी
          </label>
          <input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 transition transform duration-150 focus:scale-105"
            autoComplete="username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-blue-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            पासवर्ड
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 transition transform duration-150 focus:scale-105"
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full transition transform duration-150 hover:scale-105 active:scale-95"
            disabled={loading}
          >
            {loading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
          </button>
        </div>
      </form>
    </div>
  );
}

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

AdminLogin.defaultProps = {
  loading: false,
  error: "",
};

export default AdminLogin;
