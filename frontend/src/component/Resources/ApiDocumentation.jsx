import React from "react";
import { useNavigate } from "react-router-dom";
import "./ApiDocumentation.css";

const ApiDocumentation = () => {
    const navigate = useNavigate();

    const apiRoutes = [
        {
            group: "User Authentication",
            routes: [
                { method: "POST", path: "/user/signin", desc: "Register a new user account." },
                { method: "POST", path: "/user/otpverify", desc: "Verify user email via OTP." },
                { method: "POST", path: "/user/login", desc: "Authenticate user and get token." }
            ]
        },
        {
            group: "Transactions",
            routes: [
                { method: "POST", path: "/userTransaction/Transaction", desc: "Create a new financial transaction (Auth required)." },
                { method: "GET", path: "/userTransaction/Transaction/:id", desc: "Fetch details of a specific transaction." },
                { method: "DELETE", path: "/userTransaction/Transaction/delete/:id", desc: "Remove a transaction record." }
            ]
        },
        {
            group: "Recurring Expenses",
            routes: [
                { method: "POST", path: "/recurringExpense/create", desc: "Setup a new recurring payment." },
                { method: "PUT", path: "/recurringExpense/update/:id", desc: "Modify an existing recurring expense." },
                { method: "POST", path: "/recurringExpense/mark/:id", desc: "Mark a recurring item as paid." }
            ]
        },
        {
            group: "Analytics",
            routes: [
                { method: "GET", path: "/monthlyExpense", desc: "Get aggregated monthly spending data." }
            ]
        }
    ];

    return (
        <div className="api-doc-wrapper">
            <div className="f-card api-doc-card">
                <div className="f-icon">📂</div>
                <h2>API Documentation</h2>
                <p className="intro-text">
                    Explore our REST API endpoints. Use these routes to interact with the 
                    expense tracking engine programmatically. All protected routes require a <strong>Bearer Token</strong>.
                </p>

                <div className="api-sections-container">
                    {apiRoutes.map((section, idx) => (
                        <div key={idx} className="api-group">
                            <h3>{section.group}</h3>
                            {section.routes.map((route, ridx) => (
                                <div key={ridx} className="api-route-item">
                                    <div className="route-header">
                                        <span className={`method-badge ${route.method.toLowerCase()}`}>
                                            {route.method}
                                        </span>
                                        <code className="route-path">{route.path}</code>
                                    </div>
                                    <p className="route-desc">{route.desc}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ApiDocumentation;