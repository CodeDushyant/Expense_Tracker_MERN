import React from "react";
import { Trash2, Calendar } from "lucide-react";
import { useState } from "react";
import "./RecentExpenses.css";

const RecentExpenses = ({ expenses, onDelete }) => {
  const [category, setCategory] = useState("All");
  const filterExpenses = 
  category === 'All' ? expenses :
  expenses.filter(e=>e.category === category)
  return (
    <div className="recent-card-recent">
      <div className="recent-header">
        <h3>Recent Expenses</h3>

        <select className="category-filter"  value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option  value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Healthcare">Healthcare</option>
          <option value="EMI">EMI</option>
          <option value="Rent">Rent</option>
          <option value="Subscription">Subscription</option>
          <option value="RecurringExpense">RecurringExpense</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="recent-list">
        {filterExpenses.map((item) => (
          <div key={item._id} className="recent-row">
            <div className="left">
              <div className="title-badge">
                <span className="title">{item.title}</span>
                <span className={`badge ${item.category.toLowerCase()}`}>
                  {item.category}
                </span>
              </div>

              <div className="date">
                <Calendar size={13} />
                {item.transactionDate
                  ? new Date(item.transactionDate).toLocaleDateString()
                  : "No Date"}
              </div>
            </div>

            <div className="right">
              <span className="amount">₹{item.amount}</span>

              <button
                className="delete"
                onClick={() => onDelete(item._id)} 
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {filterExpenses.length === 0 && (
          <p>There is no expense</p>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
