import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import Logo from "../components/Logo";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            await API.post("/auth/forgot-password", { email });
            alert("OTP sent to your email!");
            navigate("/verify-otp", { state: { email } });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <Logo size="small" />
                <div className="title">Forgot Password</div>
                <div className="subtitle">Enter your email to receive an OTP</div>

                <label>Email</label>
                <div className="field-group">
                    <input
                        type="email"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <button className="login-btn" onClick={handleForgotPassword} disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                    <div className="password-row">
                        <span className="auth-link" onClick={() => navigate("/login")}>
                            Back to Login
                        </span>
                    </div>
                </div>
            </div>

            <div className="auth-illustration">
                <img src="/src/assets/login.svg" alt="illustration" />
            </div>
        </div>
    );
}
