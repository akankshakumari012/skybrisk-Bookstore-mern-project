import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiBaseUrl = import.meta.env.VITE_API_URL || "https://skybrisk-bookstore-mern-project.onrender.com";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all fields.", { position: "bottom-right" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { position: "bottom-right" });
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Registration successful. Please login.", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message, { position: "bottom-right" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F7FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          background: "white",
          padding: "40px",
          width: "350px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#7C3AED",
            marginBottom: "25px",
          }}
        >
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            color: "#666",
          }}
        >
          Already have an account? {" "}
          <Link to="/login" style={{ color: "#7C3AED" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};
