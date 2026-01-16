import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; 
import "../styles/auth.css";
// Adjust path to where your actual image file is
import signUpImg from "../assets/sign-up.svg"; 

export default function Register() {
  const navigate = useNavigate();
  
  // State for user input
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Register Logic
  const handleRegister = async () => {
    // 1. Validations
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.role || formData.role === "Select your Role") {
      setError("Please select a role");
      return;
    }

    try {
      setError("");
      // 2. Send data to Backend
      const { data } = await API.post("/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        collegeName: formData.collegeName,
        role: formData.role,
      });

      // 3. Save success data and redirect
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Registration Successful!");
      
      if (data.role === "college_admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      
      {/* LEFT: ILLUSTRATION */}
      <div className="auth-illustration">
        <img src={signUpImg} alt="Register Illustration" />
      </div>

      {/* RIGHT: FORM */}
      <div className="auth-form">
        <div className="logo">EVEMAN</div>
        <div className="title">Register Now</div>

        {/* Error Message */}
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <label>Full Name</label>
        <div className="field-group">
          <input 
            name="fullName" 
            placeholder="Enter your Full Name" 
            value={formData.fullName}
            onChange={handleChange} 
          />
        </div>

        <label>College/University</label>
        <div className="field-group">
          <input 
            name="collegeName" 
            placeholder="Enter your College/University Name" 
            value={formData.collegeName}
            onChange={handleChange} 
          />
        </div>

        <label>Email</label>
        <div className="field-group">
          <input 
            name="email" 
            type="email"
            placeholder="Enter your email id" 
            value={formData.email}
            onChange={handleChange} 
          />
        </div>

        <label>Password</label>
        <div className="field-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
            value={formData.password}
            onChange={handleChange} 
          />
        </div>

        <label>Re-enter Password</label>
        <div className="field-group">
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Re-enter your password again" 
            value={formData.confirmPassword}
            onChange={handleChange} 
          />
        </div>

        <label>Role</label>
        <div className="field-group">
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select your Role</option>
            <option value="student">Student</option>
            <option value="college_admin">College Admin</option>
          </select>
        </div>

        <button className="login-btn" onClick={handleRegister}>Sign Up</button>

        <div className="password-row">
          <span>Already have an account?</span>
          <span className="auth-link" onClick={() => navigate("/")}>Login</span>
        </div>
      </div>
    </div>
  );
}