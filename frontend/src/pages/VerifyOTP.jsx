import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import Logo from "../components/Logo";

export default function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerifyOTP = async () => {
        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        try {
            setLoading(true);
            await API.post("/auth/verify-otp", { email, otp });
            alert("OTP verified successfully!");
            navigate("/reset-password", { state: { email, otp } });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <Logo size="small" />
                <div className="title">Verify OTP</div>
                <div className="subtitle">Enter the 6-digit OTP sent to {email}</div>

                <label>OTP</label>
                <div className="field-group">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <button className="login-btn" onClick={handleVerifyOTP} disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    <div className="password-row">
                        <span className="auth-link" onClick={() => navigate("/forgot-password")}>
                            Resend OTP
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
