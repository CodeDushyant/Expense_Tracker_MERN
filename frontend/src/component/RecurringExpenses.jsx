import React, { useState } from "react";
import { RefreshCw, Trash2, PlusCircle } from "lucide-react";
import "./RecurringExpenses.css";

export function RecurringExpenses({ expenses, onAddExpense, onDeleteExpense }) {
  // Filter only recurring expenses from the main list
  const recurringItems = expenses.filter((exp) => exp.isRecurring);

  // Calculate total monthly estimate
  const estimatedMonthlyTotal = recurringItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    recurringFrequency: "monthly",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount),
      isRecurring: true,
    });

    setFormData({ ...formData, description: "", amount: "" });
  };

  return (
    <div className="recurring-container">
      {/* Banner Header */}
      <div className="recurring-banner">
        <div className="banner-content">
          <div className="banner-title">
            <RefreshCw className="icon-white" size={24} />
            <h2>Recurring Expenses</h2>
          </div>
          <p>Manage your subscriptions and regular payments</p>
          <div className="monthly-estimate">
            <span className="estimate-label">Estimated Monthly Total</span>
            <span className="estimate-amount">
              ₹{estimatedMonthlyTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="recurring-grid">
        {/* Left Side: Form */}
        <div className="recurring-form-card card">
          <h3>Add Recurring Expense</h3>
          <form onSubmit={handleSubmit} className="recurring-form">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="e.g., Netflix Subscription"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option>Food</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Healthcare</option>
              </select>
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <select
                value={formData.recurringFrequency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurringFrequency: e.target.value,
                  })
                }
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <button type="submit" className="add-recurring-btn">
              <PlusCircle size={18} /> Add Recurring Expense
            </button>
          </form>
        </div>

        {/* Right Side: List */}
        <div className="recurring-list-section">
          <h3>Active Recurring Expenses ({recurringItems.length})</h3>
          <div className="recurring-items-list">
            {recurringItems.map((item) => (
              <div key={item._id} className="recurring-item card">
                <div className="item-details">
                  <div className="item-main">
                    <h4>{item.description}</h4>
                    <span className={`badge ${item.category.toLowerCase()}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="item-sub">
                    <RefreshCw size={12} />
                    <span>
                      {item.recurringFrequency} | Jan{" "}
                      {new Date(item.date).getDate()}
                    </span>
                  </div>
                </div>
                <div className="item-finance">
                  <div className="price-block">
                    <span className="price">₹{item.amount.toFixed(2)}</span>
                    <span className="per-period">per month</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteExpense(item._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
