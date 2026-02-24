import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmailAlerts.css";

const EmailAlerts = () => {
    const navigate = useNavigate();

    return (
        <div className="email-alerts-wrapper">
            <div className="f-card email-alerts-card">
                <div className="f-icon">📧</div>
                <h2>Email Notifications & Alerts</h2>
                <p className="intro-text">
                    Stay informed without even opening the app. We send timely updates to your inbox so you 
                    never miss a due date or exceed your spending limits.
                </p>

                <div className="extra-content">
                    <div className="alert-types">
                        <h3>What alerts will you receive?</h3>
                        <div className="alert-item">
                            <span className="alert-status active"></span>
                            <div>
                                <strong>Bill Reminders:</strong>
                                <p>Get notified 3 days before any subscription or utility bill is due.</p>
                            </div>
                        </div>
                        <div className="alert-item">
                            <span className="alert-status active"></span>
                            <div>
                                <strong>Budget Breach:</strong>
                                <p>Instant alert if you spend more than 90% of your allocated monthly budget.</p>
                            </div>
                        </div>
                        <div className="alert-item">
                            <span className="alert-status"></span>
                            <div>
                                <strong>Weekly Insights:</strong>
                                <p>A summary of your weekly spending habits every Monday morning.</p>
                            </div>
                        </div>
                    </div>

                    <div className="settings-note">
                        <p>⚙️ You can customize these frequencies in your Profile Settings.</p>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default EmailAlerts;