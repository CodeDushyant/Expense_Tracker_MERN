import React, { useState } from "react";
import { Trash2, Calendar, CheckCircle } from "lucide-react";
import './ActiveRecurringExpenses.css';
import axios from 'axios';

const ActiveRecurringExpenses = ({
  recurringexpenses,
  onDeleteRecurring,
  setExpenses,
  onMark,
  setRecurringExpenses
}) => {

  const safeExpenses = Array.isArray(recurringexpenses)
    ? recurringexpenses
    : [];

  const [category, setCategory] = useState("All");
  const [selectedExpense, setSelectedExpense] = useState(null); // 🔹 modal state

  const filterExpenses =
    category === "All"
      ? safeExpenses
      : safeExpenses.filter(e => e.category === category);

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
  };

  const closeModal = () => {
    setSelectedExpense(null);
  };

  const handleUpdateRecurring = async (updatedExpense) => {
    const token = localStorage.getItem("token");
    try {
      

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/recurringExpense/update/${updatedExpense._id}`,
        updatedExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (res.data.success) {
        // 🔹 Correctly update parent state
        setRecurringExpenses(prev =>
          prev.map(e => e._id === updatedExpense._id ? { ...res.data.data } : e)
        );
        closeModal();
      }


    } catch (error) {
      console.log(error);
      alert("Failed to update recurring expense");
    }
  };

  const handleCreateExpense = async (item) => {
    try {
      const expenseData = {
        title: item.title,
        amount: parseFloat(item.amount),
        category: "RecurringExpense",
        date: new Date().toISOString().split("T")[0],
        typeOfTransaction: "Debit"
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/userTransaction/Transaction`,
        expenseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setExpenses((prev) => [response.data.data, ...prev]);
        item.expenseId = response.data.data._id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="ar-card">

    <div className="ar-header">
      <h3 className="ar-heading">
        Active Recurring Expenses ({safeExpenses.length})
      </h3>
    </div>

    <div className="ar-list">
      {filterExpenses.length > 0 && (
        <p className="ar-info-text">
          If you have paid the recurring expense, then mark it or update it.
        </p>
      )}

      {filterExpenses.map((item) => (
        <div
          key={item._id}
          className={`ar-row ${!item.isActive ? "ar-paid-row" : ""}`}
        >
          <div className="ar-left">
            <div className="ar-title-badge">
              <span className="ar-title">{item.title}</span>
              <span className={`ar-badge ${item.category?.toLowerCase()}`}>
                {item.category}
              </span>
            </div>

            <div className="ar-date">
              <Calendar size={13} /> Due: {item.dueDay}
            </div>
          </div>

          <div className="ar-right">
            <span className="ar-amount">₹{item.amount}</span>

            <button
              className={`ar-paid-btn ${!item.isActive ? "ar-done" : ""}`}
              onClick={() => {
                if (item.isActive) {
                  handleCreateExpense(item);
                  onMark(item._id);
                }
              }}
            >
              <CheckCircle size={18} />
            </button>

            <button
              className="ar-update-btn"
              onClick={() => openEditModal(item)}
            >
              Update
            </button>

            <button
              className="ar-delete-btn"
              onClick={() => onDeleteRecurring(item._id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
     {selectedExpense && (
  <div className="ar-modal">
    <div className="ar-modal-content">
      <h3>Update Expense</h3>
      <input
        type="text"
        value={selectedExpense.title}
        onChange={(e) =>
          setSelectedExpense({ ...selectedExpense, title: e.target.value })
        }
        placeholder="Title"
      />
      <input
        type="number"
        value={selectedExpense.amount}
        onChange={(e) =>
          setSelectedExpense({ ...selectedExpense, amount: e.target.value })
        }
        placeholder="Amount"
      />
      <input
        type="number"
        min="1"
        max="31"
        value={selectedExpense.dueDay} 
        onChange={(e) =>
          setSelectedExpense({ ...selectedExpense, dueDay: e.target.value })
        }
        placeholder="Due Day"
      />
      <div className="ar-modal-actions">
        <button onClick={() => handleUpdateRecurring(selectedExpense)}>
          Save
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
)}



      {filterExpenses.length === 0 && (
        <div className="ar-empty">
          <p>There is no Recurring expense</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ActiveRecurringExpenses;
