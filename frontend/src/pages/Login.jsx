import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

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

      {/* EMAIL */}
      <label>Email</label>
      <div className="field-group">
        <input
          type="email"
          placeholder="Enter your email id"
        />
      </div>

      <label>Password:-</label>

<div className="field-group">
  <input
    type="password"
    placeholder="Enter your password"
  />

  <div className="password-row">
    <label className="remember-me">
      <input type="checkbox" />
      Remember Me
    </label>

    <span className="auth-link">
      Forgot Password?
    </span>
  </div>
</div>


      <div className="field-group">
  <button className="login-btn">Login</button>

  <div className="password-row">
    <span>Not registered yet?</span>
    <span className= "auth-link" onClick={() => navigate("/signup")}>Sign Up</span>
  </div>
</div>


    </div>

    {/* ILLUSTRATION */}
    <div className="auth-illustration">
      <img src="./src/assets/login.svg" alt="illustration" />
    </div>
  </div>
);

}
