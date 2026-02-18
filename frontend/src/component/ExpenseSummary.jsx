import React from 'react';
import './ExpenseSummary.css';

const ExpenseSummary = ({ expenses }) => {
  // Logic to calculate values based on the design
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const thisMonthExpenses = totalExpenses; // Or filter by current date
  const averageExpense = expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0;
  const totalTransactions = expenses.length;

  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary</h2>
      
      {/* Total Expenses Card */}
      <div className="summary-card main-highlight">
        <div className="card-header">
          <div className="icon-box purple-dark">
            <span className="icon-symbol">₹</span>
          </div>
          <span className="card-label">Total Expenses</span>
        </div>
        <div className="card-value large">₹{totalExpenses.toFixed(2)}</div>
      </div>

      {/* This Month Card */}
      <div className="summary-card light-highlight">
        <div className="card-header">
          <div className="icon-box light-blue">
            <span className="icon-symbol">📅</span>
          </div>
          <span className="card-label">This Month</span>
        </div>
        <div className="card-value medium">₹{thisMonthExpenses.toFixed(2)}</div>
      </div>

      {/* Average Expense Card */}
      <div className="summary-card light-highlight">
        <div className="card-header">
          <div className="icon-box light-purple">
            <span className="icon-symbol">📈</span>
          </div>
          <span className="card-label">Average Expense</span>
        </div>
        <div className="card-value medium">₹{averageExpense}</div>
      </div>

      <div className="transactions-footer">
        <p className="footer-label">Total Transactions</p>
        <p className="footer-count">{totalTransactions}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;