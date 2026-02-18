import React from "react";
import { useNavigate } from "react-router-dom";
import "./VisualReports.css";

const VisualReports = () => {
    const navigate = useNavigate();

    return (
        <div className="visual-reports-wrapper">
            <div className="f-card visual-reports-card">
                <div className="f-icon">📈</div>
                <h2>Visual Analytics & Reports</h2>
                <p className="intro-text">
                    Turn your numbers into beautiful, easy-to-read charts. Understand your financial 
                    health at a glance with our automated reporting engine.
                </p>

                <div className="extra-content">
                    <div className="reports-grid">
                        <div className="report-item">
                            <h4>Expense Breakdown</h4>
                            <div className="mock-chart pie-chart"></div>
                            <p>See exactly which categories (Food, Rent, Fun) consume your income.</p>
                        </div>
                        <div className="report-item">
                            <h4>Income vs Savings</h4>
                            <div className="mock-chart bar-chart">
                                <div className="bar bar-1"></div>
                                <div className="bar bar-2"></div>
                                <div className="bar bar-3"></div>
                            </div>
                            <p>Track how much you are saving compared to what you earn monthly.</p>
                        </div>
                    </div>

                    <div className="highlight-box">
                        <p>✨ <strong>New Feature:</strong> Export your monthly reports as PDF or CSV for tax filing.</p>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default VisualReports;