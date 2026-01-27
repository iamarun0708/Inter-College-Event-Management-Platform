import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Logo from "../components/Logo";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      
      <div className="auth-illustration">
        <img
          src="./src/assets/sign-up.svg"
          alt="Register Illustration"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form">
        <Logo size="small"/>
        <div className="title">Register Now</div>

        <label>Full Name</label>
        <input placeholder="Enter your Full Name" />

        <label>College/University</label>
        <input placeholder="Enter your College/University Name" />

        <label>Email</label>
        <input placeholder="Enter your email id" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <label>Re-enter Password</label>
        <input type="password" placeholder="Re-enter your password again" />

        <label>Role</label>
        <select>
          <option>Select your Role</option>
          <option value="student">Student</option>
          <option value="college_admin">College Admin</option>
        </select>

        <button className="login-btn">Sign Up</button>

        <div className="password-row">
          <span>Already have an account?</span>
          <span className="auth-link" onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}
