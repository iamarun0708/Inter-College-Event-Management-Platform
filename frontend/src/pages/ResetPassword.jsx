import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import Logo from "../components/Logo";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const otp = location.state?.otp || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await API.post("/auth/reset-password", { email, otp, password });
            alert("Password reset successful! You can now login.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <Logo size="small" />
                <div className="title">Reset Password</div>
                <div className="subtitle">Enter your new password</div>

                <label>New Password</label>
                <div className="field-group">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <label>Confirm Password</label>
                <div className="field-group">
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <button className="login-btn" onClick={handleResetPassword} disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </div>
            </div>

            <div className="auth-illustration">
                <img src="/src/assets/login.svg" alt="illustration" />
            </div>
        </div>
    );
}
