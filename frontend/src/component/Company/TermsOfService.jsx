import React from "react";
import { useNavigate } from "react-router-dom";
import "./TermsOfService.css";

const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <div className="terms-wrapper">
            <div className="f-card terms-card">
                <div className="f-icon">📜</div>
                <h2>Terms of Service</h2>
                <p className="last-updated">Effective Date: February 17, 2026</p>

                <div className="terms-content">
                    <section>
                        <h3>1. Acceptance of Terms</h3>
                        <p>By using our services, you agree to comply with our rules and privacy policy. If you do not agree with any of these terms, please refrain from using the platform.</p>
                    </section>

                    <section>
                        <h3>2. User Responsibilities</h3>
                        <p>You are responsible for maintaining the security of your account and password. You must not engage in any illegal activity or upload inappropriate content on our platform.</p>
                    </section>

                    <section>
                        <h3>3. Service Availability</h3>
                        <p>We strive to keep the platform operational 24/7; however, maintenance or technical issues may occasionally result in temporary service interruptions.</p>
                    </section>

                    <section>
                        <h3>4. Limitation of Liability</h3>
                        <p>We provide this platform only as a tracking tool. Before making any financial decisions, consult a professional advisor. We are not responsible for any financial loss incurred by users.</p>
                    </section>

                    <div className="agreement-box">
                        <p>By continuing to use this platform, you acknowledge that you have read and understood these terms.</p>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TermsOfService;
