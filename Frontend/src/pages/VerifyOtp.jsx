import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            // Should save token or state to verify allow reset
            navigate('/reset-password', { state: { email, otp, verified: true } });
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Verify OTP</h2>
                <p>Enter the OTP sent to {email}</p>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Verify</button>
                    <button type="button" className="btn-link" onClick={() => navigate('/forgot-password')}>Resend OTP</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
