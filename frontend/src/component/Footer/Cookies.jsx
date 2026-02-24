import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cookies.css";

const Cookies = () => {
    const navigate = useNavigate();

    return (
        <div className="cookies-wrapper">
            <div className="f-card cookies-card">
                <div className="f-icon">🍪</div>
                <h2>Cookie Policy</h2>
                <p className="intro-text">
                    We use cookies and local storage to ensure you get the best experience on our platform. 
                    This helps us keep your account secure and remember your preferences.
                </p>

                <div className="cookies-content">
                    <div className="cookie-section">
                        <h3>Essential Storage</h3>
                        <p>We use local storage to keep you logged in and to save your theme settings (Light/Dark mode) across different sessions.</p>
                    </div>

                    <div className="cookie-section">
                        <h3>Performance & Security</h3>
                        <p>These trackers allow us to monitor system performance and protect your financial data from unauthorized access.</p>
                    </div>
                </div>

                <div className="button-container">
                    <button className="btn-back-home" onClick={() => navigate("/")}>
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cookies;