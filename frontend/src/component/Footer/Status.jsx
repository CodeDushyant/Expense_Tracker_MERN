import React from "react";
import { useNavigate } from "react-router-dom";
import "./Status.css";

const Status = () => {
    const navigate = useNavigate();

    const systems = [
        { name: "User Authentication", status: "Operational" },
        { name: "Transaction Database", status: "Operational" },
        { name: "Email Alert Service", status: "Operational" },
        { name: "Reporting Engine", status: "Operational" }
    ];

    return (
        <div className="status-wrapper">
            <div className="f-card status-card">
                <div className="f-icon">🌐</div>
                <h2>System Status</h2>
                <div className="overall-status">
                    <span className="pulse-dot"></span>
                    All Systems Operational
                </div>

                <div className="system-grid">
                    {systems.map((s, idx) => (
                        <div key={idx} className="system-row">
                            <span>{s.name}</span>
                            <span className="status-label">{s.status}</span>
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

export default Status;