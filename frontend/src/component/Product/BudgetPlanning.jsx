import React from "react";
import { useNavigate } from "react-router-dom";
import "./BudgetPlanning.css";

const BudgetPlanning = () => {
    const navigate = useNavigate();

    return (
        <div className="budget-planning-wrapper">
            <div className="f-card budget-planning-card">
                <div className="f-icon">📊</div>
                <h2>Budget Planning</h2>
                <p className="intro-text">
                    Take control of your finances by setting realistic budget goals. Our tool helps you 
                    allocate funds wisely, track limits, and ensure you never overspend on what matters less.
                </p>

                <div className="extra-content">
                    <div className="feature-section">
                        <h3>Smart Budgeting Features</h3>
                        <ul>
                            <li><strong>Limit Alerts:</strong> Get notified when you cross 80% of your category limit.</li>
                            <li><strong>Goal Tracking:</strong> Set aside money for a new car, vacation, or emergency fund.</li>
                            <li><strong>Rule of Thumb:</strong> Implementation of the 50/30/20 budgeting rule.</li>
                        </ul>
                    </div>

                    <div className="info-box">
                        <h4>💡 Pro Tip: The 50/30/20 Rule</h4>
                        <p>Spend 50% on Needs, 30% on Wants, and save 20% of your income.</p>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default BudgetPlanning;