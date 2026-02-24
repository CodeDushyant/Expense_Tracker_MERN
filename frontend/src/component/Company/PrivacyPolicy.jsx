import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="policy-wrapper">
            <div className="f-card policy-card">
                <div className="f-icon">🛡️</div>
                <h2>Privacy Policy</h2>
                <p className="last-updated">Last Updated: February 2026</p>

                <div className="policy-content">
                    <section>
                        <h3>1. Data We Collect</h3>
                        <p>We only collect data that is essential for tracking your expenses, such as transaction amounts, categories, and dates. We do not access any personal information beyond what is necessary for the app to function.</p>
                    </section>

                    <section>
                        <h3>2. How We Use Your Data</h3>
                        <p>Your data is exclusively used to provide personalized financial insights and visual reports. We maintain a strict policy against selling or sharing your data with third-party marketing companies.</p>
                    </section>

                    <section>
                        <h3>3. Data Security</h3>
                        <p>Your financial records are protected using industry-standard encryption protocols. We prioritize data security to ensure that your records remain confidential and safe from unauthorized access.</p>
                    </section>

                    <section className="highlight-policy">
                        <p><strong>Note:</strong> If you choose to delete your account, all your transaction history and personal data will be permanently removed from our servers and cannot be recovered.</p>
                    </section>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;