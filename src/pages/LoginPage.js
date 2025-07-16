import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import axios from "axios";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ loginId, password }) => {
    setLoading(true);
    setError("");
    try {
      // API INTEGRATION: POST /api/admin/login - Authenticate admin user and retrieve token
const res = await axios.post("/api/admin/login", { loginId, password });
      localStorage.setItem("admin_token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLogin onLogin={handleLogin} loading={loading} error={error} />
  );
}

export default LoginPage;
