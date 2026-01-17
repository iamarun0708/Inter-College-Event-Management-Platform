import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css'; // Assuming existing styles

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(res.data.message);
            setError('');
            setTimeout(() => {
                navigate('/verify-otp', { state: { email } });
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Forgot Password</h2>
                {message && <div className="success-msg">{message}</div>}
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Send OTP</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
