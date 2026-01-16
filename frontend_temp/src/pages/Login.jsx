import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; 
import "../styles/auth.css";
// Ensure this path is correct for your project structure
import loginImg from "../assets/login.svg";

export default function Login() {
  const navigate = useNavigate();
  
  // State for logic
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      // 1. Send data to Backend
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // 2. Save success data
      localStorage.setItem("userInfo", JSON.stringify(data));

      // 3. Redirect based on Role
      if (data.role === "college_admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <div className="logo">EVEMAN</div>
        <div className="title">Login now</div>
        <div className="subtitle">Hi, Welcome back 👋</div>

        {/* Error Message Display */}
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <button className="google-btn">Login with Google</button>

        <div className="divider">
          <span></span>
          <p>or Login with Email</p>
          <span></span>
        </div>

        {/* EMAIL INPUT */}
        <label>Email</label>
        <div className="field-group">
          <input
            type="email"
            placeholder="Enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD INPUT */}
        <label>Password</label>
        <div className="field-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="password-row">
            <label className="remember-me">
              <input type="checkbox" />
              Remember Me
            </label>

            <span className="auth-link-p">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <div className="field-group">
          <button className="login-btn" onClick={handleLogin}>Login</button>

          <div className="password-row">
            <span>Not registered yet?</span>
            <span className="auth-link" onClick={() => navigate("/signup")}>Sign Up</span>
          </div>
        </div>

      </div>

      {/* ILLUSTRATION */}
      <div className="auth-illustration">
        <img src={loginImg} alt="Login Illustration" />
      </div>
    </div>
  );
}