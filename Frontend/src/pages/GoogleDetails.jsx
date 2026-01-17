import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/auth.css"; // Assuming shared styles

export default function GoogleDetails() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        college: "",
        mobile: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send data to backend -> POST /api/auth/google-complete (or similar)
        console.log("Submitting Google Details:", formData);
        // Mock success for now
        navigate("/student"); // or /admin based on role
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form">
                <div className="logo">EVEMAN</div>
                <div className="title">Details</div>

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        name="fullName"
                        placeholder="Enter your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>College/University</label>
                    <input
                        name="college"
                        placeholder="Enter your College/University Name"
                        value={formData.college}
                        onChange={handleChange}
                        required
                    />

                    <label>Mobile Number</label>
                    <input
                        name="mobile"
                        placeholder="Enter your Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />

                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="role-select"
                        required
                    >
                        <option value="" disabled>Select your Role</option>
                        <option value="student">Student</option>
                        <option value="college_admin">College Admin</option>
                    </select>

                    <button type="submit" className="login-btn continue-btn">
                        Continue
                    </button>
                </form>
            </div>

            <div className="auth-illustration">
                {/* Placeholder for the illustration from the image */}
                <img
                    src="./src/assets/login.svg"
                    alt="Details Illustration"
                />
            </div>
        </div>
    );
}
