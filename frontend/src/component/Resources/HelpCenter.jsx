import React from "react";
import { useNavigate } from "react-router-dom";
import "./HelpCenter.css";

const HelpCenter = () => {
    const navigate = useNavigate();

    const faqData = [
        {
            id: 1,
            question: "How do I start tracking my expenses?",
            answer: "Simply go to the 'Expense Tracking' section from your dashboard. Click on the 'Add' button, enter the amount, select a category, and save your transaction."
        },
        {
            id: 2,
            question: "Can I set a monthly budget limit?",
            answer: "Yes! Use the 'Budget Planning' feature to set limits for different categories like Food, Travel, or Bills. We will notify you when you reach your limit."
        },
        {
            id: 3,
            question: "Is my data stored safely?",
            answer: "Absolutely. We prioritize your privacy. Your financial data is encrypted and stored securely, ensuring that only you can access your records."
        },
        {
            id: 4,
            question: "How can I view my spending patterns?",
            answer: "Navigate to the 'Visual Reports' page. You will find interactive charts and graphs that break down your spending habits by week or month."
        }
    ];

    return (
        <div className="help-center-wrapper">
            <div className="f-card help-center-card">
                <div className="f-icon">❓</div>
                <h2>Help Center</h2>
                <p className="intro-text">
                    Have questions? We are here to help you manage your finances more effectively. 
                    Explore our frequently asked questions below.
                </p>

                <div className="faq-container">
                    {faqData.map((item) => (
                        <div key={item.id} className="faq-item">
                            <h4 className="faq-question">Q: {item.question}</h4>
                            <p className="faq-answer">{item.answer}</p>
                        </div>
                    ))}
                </div>

                <div className="contact-prompt">
                    <p>Still need help?</p>
                    <button className="btn-contact-link" onClick={() => navigate("/contact-support")}>
                        Contact Support
                    </button>
                </div>

                <button className="btn-back-home" onClick={() => navigate("/")}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default HelpCenter;