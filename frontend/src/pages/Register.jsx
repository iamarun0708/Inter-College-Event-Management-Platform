import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; 
import "../styles/auth.css"; 
import Logo from "../components/Logo"; 
import signUpImg from "../assets/sign-up.svg";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // 1. Validation
    if (!formData.name || !formData.email || !formData.password || !formData.collegeName) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      
      // 2. FIXED: Sending 'fullName' instead of 'name'
      await API.post("/auth/signup", {
        fullName: formData.name, 
        email: formData.email,
        password: formData.password,
        role: formData.role,
        collegeName: formData.collegeName 
      });

      alert("Registration Successful! Please Login.");
      navigate("/login"); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-illustration">
        <img src={signUpImg} alt="Register Illustration" />
      </div>

      <div className="auth-form">
        <Logo size="small" />
        <div className="title">Register Now</div>

        {/* Added autoComplete="off" to prevent white background glitch */}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your Full Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />

            <label>College/University</label>
            <input
              name="collegeName"
              type="text"
              placeholder="Enter your College/University Name"
              value={formData.collegeName}
              onChange={handleChange}
              autoComplete="off"
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email id"
              value={formData.email}
              onChange={handleChange}
              autoComplete="new-password" // Trick to stop email autofill background
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <label>Re-enter Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password again"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="college_admin">College Admin</option>
            </select>

            <button 
                className="login-btn" 
                onClick={handleRegister} 
                disabled={loading}
                type="button"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>

        <div className="password-row">
          <span>Already have an account?</span>
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}