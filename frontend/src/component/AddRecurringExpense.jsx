import React, { useState } from 'react';
import './AddRecurringExpense.css';
import axios from 'axios';

const AddRecurringExpense = ({ setRecurringExpenses }) => {
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [cat, setCat] = useState('Food');
  const [freq, setFreq] = useState('Monthly');
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      return alert("Session expired. Please login again.");
    }

    if (!desc || !amt) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const recurringData = {
        title: desc,
        amount: Number(amt),
        category: cat,
        frequency: freq,
        dueDay: Number(day)
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/recurringExpense/create`,
        recurringData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );


      // ✅ SAFE SUCCESS CHECK
      if (res.data?.data) {
         setRecurringExpenses(prev => [res.data.data, ...prev]);

        setDesc('');
        setAmt('');
        setCat('Food');
        setFreq('Monthly');
        setDay(1);

        alert("Recurring expense added ✅");
      } else {
        alert(res.data?.message || "Something went wrong");
      }

    } catch (error) {
      console.error("Submit Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add recurring expense ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recurring-add-card recurring-form-container">
      <h2 className="recurring-section-title">Add Recurring Expense</h2>

      <form onSubmit={handleSubmit}>

        <div className="recurring-input-group">
          <label>Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="e.g., Netflix Subscription"
          />
        </div>

        <div className="input-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            placeholder="0.00"
          />
        </div>

    

        <div className="input-group">
          <label>Frequency</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Yearly">Yearly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>

        <div className="input-group">
          <label>Due Day</label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>

        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "⊕ Add Recurring Expense"}
        </button>

      </form>
    </div>
  );
};

export default AddRecurringExpense;
