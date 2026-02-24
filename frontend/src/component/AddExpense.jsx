import React, { useState } from 'react';
import './AddExpense.css';
import axios from 'axios';

const AddExpense = ({setExpenses}) => {
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [cat, setCat] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Sets to today

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc || !amt) return;

    // 1. Prepare the data object matching your backend schema
    const expenseData = {
      title: desc,
      amount: parseFloat(amt),
      category: cat,
      date: date,
      typeOfTransaction: "Debit" // Assuming expenses are debits
    };

    try {
      // 2. Make the API call (Replace URL with your actual endpoint)
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/userTransaction/Transaction`, expenseData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Standard Bearer format
        }
      });

      if (response.data.success) {

        setExpenses((prev) => [response.data.data, ...prev]); 
        
        setDesc('');
        setAmt('');
      }
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      alert("Failed to add expense. Check console for details.");
    }
  };

  return (
    <div className="add-card form-container">
      <h2 className="section-title">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Description</label>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g., Lunch at cafe" />
        </div>
        <div className="input-group">
          <label>Amount (₹)</label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0.00" />
        </div>
        <div className="input-group">
          <label>Category</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="EMI">EMI</option>
            <option value="Subscription">Subscription</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className="add-btn">⊕ Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;