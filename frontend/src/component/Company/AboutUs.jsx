import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="about-wrapper">
            <div className="f-card about-card">
                <div className="f-icon">🚀</div>
                <h2>About Our Mission</h2>
                <p className="intro-text">
                    We believe that financial freedom starts with clarity. Our platform is designed to 
                    empower individuals to take control of their money with ease and precision.
                </p>

                <div className="about-grid">
                    <div className="about-section">
                        <h3>Who We Are</h3>
                        <p>Hum ek aisi team hain jo coding aur finance ko merge karke simple solutions banati hai. Humaara goal hai ki complex financial data ko itna asan bana dein ki koi bhi use samajh sake.</p>
                    </div>

                    <div className="about-section">
                        <h3>What We Offer</h3>
                        <ul className="about-list">
                            <li>✨ <strong>Transparency:</strong> No hidden fees or complex jargon.</li>
                            <li>🔒 <strong>Security:</strong> Your financial data is encrypted and safe.</li>
                            <li>📊 <strong>Analytics:</strong> Beautiful charts to visualize growth.</li>
                        </ul>
                    </div>
                </div>

                <div className="tech-stack">
                    <h4>Built With Modern Tech</h4>
                    <div className="tech-tags">
                        <span>React.js</span>
                        <span>Node.js</span>
                        <span>CSS Variables</span>
                        <span>Vite</span>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default AboutUs;