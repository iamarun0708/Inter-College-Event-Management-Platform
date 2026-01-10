import { useNavigate } from "react-router-dom";
//import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <div className="logo">EVEMAN</div>
        <div className="title">Login now</div>
        <div className="subtitle">Hi, Welcome back 👋</div>

        <button className="google-btn">Login with Google</button>

        <div className="divider">
          <span></span>
          <p>or Login with Email</p>
          <span></span>
        </div>

        <label>Email</label>
        <input placeholder="Enter your email id" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <button className="login-btn">Login</button>

        <div className="link">
          Not registered yet?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </div>
      </div>

      <div className="auth-illustration">
        <img
          src="./src/assets/login.svg"
          alt="illustration"
        />
      </div>
    </div>
  );
}
