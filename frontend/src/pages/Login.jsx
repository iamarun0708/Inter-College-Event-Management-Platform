import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; 
// Check your file name carefully: is it auth.css or Auth.css?
import "../styles/auth.css"; 
import loginImg from "../assets/login.svg"; 

export default function Login() {
  const navigate = useNavigate();
  
  // --- LOGIC SECTION ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      if (data.role === "college_admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  // --- VISUAL SECTION ---
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <div className="logo">EVEMAN</div>
        <div className="title">Login now</div>
        <div className="subtitle">Hi, Welcome back 👋</div>

        {/* Error Message */}
        {error && <div style={{ color: "red", fontSize: "0.9rem", marginBottom: "10px" }}>{error}</div>}

        <button className="google-btn">Login with Google</button>

        <div className="divider">
          <span></span>
          <p>or Login with Email</p>
          <span></span>
        </div>

        {/* EMAIL */}
        <label>Email</label>
        <div className="field-group">
          <input
            type="email"
            placeholder="Enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <label>Password:-</label>
        <div className="field-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FORCED ALIGNMENT FIX: Added style={{ display: 'flex'... }} */}
          <div className="password-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
            <label className="remember-me" style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
              <input type="checkbox" style={{ width: "auto", margin: 0 }} />
              Remember Me
            </label>

            <span className="auth-link-p" style={{ cursor: "pointer", color: "#666" }}>
              Forgot Password?
            </span>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <div className="field-group">
          <button className="login-btn" onClick={handleLogin}>Login</button>

          <div className="password-row" style={{ marginTop: "10px", textAlign: "center" }}>
            <span>Not registered yet? </span>
            <span className="auth-link" onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "#6C63FF", fontWeight: "bold" }}>
              Sign Up
            </span>
          </div>
        </div>

      </div>

      {/* ILLUSTRATION */}
      <div className="auth-illustration">
        <img src={loginImg} alt="illustration" />
      </div>
    </div>
  );
}