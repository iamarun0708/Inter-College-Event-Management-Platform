import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);



      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data); // Debugging line

      // FIX: Check for 'fullName' OR 'name' to be safe
      const userName = res.data.fullName || res.data.name || "Student";
      const { token, role, _id } = res.data;

      // Save correctly to Local Storage
      localStorage.setItem("user", JSON.stringify({ 
          token, 
          role, 
          name: userName, // <--- This ensures the name is saved
          _id, 
          email 
      }));

      

      // 4. Redirect based on Role
      if (role === "college_admin") {
        navigate("/admin"); // Go to Admin Dashboard
      } else {
        navigate("/student-dashboard"); // Go to Student Dashboard
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <Logo size="small" />
        <div className="title">Login now</div>
        <div className="subtitle">Hi, Welcome back 👋</div>

        {/* Removed Google Btn for now as backend doesn't support it yet */}
        
        <label>Email</label>
        <div className="field-group">
          <input
            type="email"
            placeholder="Enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

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
            <span className="auth-link-p">Forgot Password?</span>
          </div>
        </div>

        <div className="field-group">
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="password-row">
            <span>Not registered yet?</span>
            <span className="auth-link" onClick={() => navigate("/register")}>
              Sign Up
            </span>
          </div>
        </div>
      </div>

      <div className="auth-illustration">
         {/* Make sure this image path exists in your new folder structure! */}
        <img src="/src/assets/login.svg" alt="illustration" />
      </div>
    </div>
  );
}