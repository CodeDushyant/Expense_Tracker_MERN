import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExpenseTracking.css";

const ExpenseTracking = () => {
    const navigate = useNavigate();

    return (
        <div className="expense-tracking-wrapper">
            <div className="f-card expense-tracking-card centered-card">
                <div className="f-icon">💰</div>
                <h2>Expense Tracking</h2>
                <p className="intro-text">
                    Track all your expenses daily, weekly, and monthly. Get detailed insights into your spending habits,
                    categorize expenses, and stay on top of your budget effortlessly. Analyze patterns and save smarter.
                </p>

                <div className="extra-content">
                    <div className="feature-section">
                        <h3>Why Track Expenses?</h3>
                        <ul>
                            <li><strong>Real-time Insights:</strong> See where your money goes instantly.</li>
                            <li><strong>Smart Categorization:</strong> Food, Rent, Travel - sorted automatically.</li>
                            <li><strong>Monthly Reports:</strong> Visual charts to understand spending trends.</li>
                        </ul>
                    </div>

                    <div className="feature-section">
                        <h3>How it Works</h3>
                        <p>Simply log your daily transactions, and our engine will calculate your remaining balance and suggest optimizations for your budget.</p>
                    </div>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ExpenseTracking;