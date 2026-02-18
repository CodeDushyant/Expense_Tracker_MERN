import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContactSupport.css";

const ContactSupport = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-wrapper">
            <div className="f-card contact-card">
                <div className="f-icon">🎧</div>
                <h2>Contact Support</h2>
                <p className="intro-text">
                    Have a question or facing a technical issue? While our automated support system is 
                    under maintenance, you can reach out to our lead developer directly.
                </p>

                <div className="connect-options">
                    {/* Gmail Option */}
                    <a href="mailto:your-email@gmail.com" className="connect-item gmail">
                        <div className="icon">✉️</div>
                        <div className="details">
                            <strong>Email Support</strong>
                            <p>dushyantsingh5161@gmail.com</p>
                        </div>
                    </a>

                    {/* LinkedIn Option */}
                    <a 
                        href="https://www.linkedin.com/in/dushyant-chauhan-825a46288/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="connect-item linkedin"
                    >
                        <div className="icon">🔗</div>
                        <div className="details">
                            <strong>LinkedIn Profile</strong>
                            <p>Connect with Dushyant</p>
                        </div>
                    </a>
                </div>

                <div className="response-badge">
                    <span className="dot"></span>
                    Typically responds within 24 hours
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ContactSupport;