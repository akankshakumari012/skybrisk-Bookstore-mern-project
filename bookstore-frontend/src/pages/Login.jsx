import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const apiBaseUrl = import.meta.env.VITE_API_URL || "https://skybrisk-bookstore-mern-project.onrender.com";

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful", { position: "bottom-right" });
      navigate("/books");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, { position: "bottom-right" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "320px",
          animation: "fadeIn 0.6s ease",
        }}
      >
        <h2 style={{ color: "#7C3AED", textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            background: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}