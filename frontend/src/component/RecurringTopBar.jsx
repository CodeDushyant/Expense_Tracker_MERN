import React from 'react';
import { RefreshCw } from 'lucide-react';
import './RecurringTopBar.css';

const RecurringTopBar = ({ totalAmount, LeftAmount }) => {
  return (
    <div className="recurring-card-container">

      <div className="recurring-header">
        <div className="recurring-title-row">
          <RefreshCw size={24} className="recurring-icon" />
          <h2 className="recurring-title">Recurring Expenses</h2>
        </div>
        <p className="recurring-subtitle">
          Manage your subscriptions and regular payments
        </p>
      </div>

      <div className="recurring-amount-wrapper">

        <div className="recurring-estimate-box">
          <span className="estimate-label">Estimated Monthly Total</span>
          <div className="estimate-value">₹{totalAmount}</div>
        </div>

        <div className="recurring-estimate-box left-box">
          <span className="estimate-label">Amount Left to Pay This Month</span>
          <div className="estimate-value">₹{LeftAmount}</div>
        </div>

      </div>

    </div>
  );
};

export default RecurringTopBar;
