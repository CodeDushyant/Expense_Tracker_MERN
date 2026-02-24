import React, { useEffect, useState } from "react";
import "./ExpenseLimit.css";
import axios from "axios";

const ExpenseLimit = () => {

  const [activeTab, setActiveTab] = useState("monthly");
  const [loading, setLoading] = useState(true);

  const [limits, setLimits] = useState({
    dailyLimit: 0,
    weeklyLimit: 0,
    monthlyLimit: 0
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId');

  const keyMap = {
    daily: "dailyLimit",
    weekly: "weeklyLimit",
    monthly: "monthlyLimit"
  };

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/expense/expense-details`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setLimits(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLimit();
  }, [token]);

const [spent, setSpent] = useState({
  daily: 0,
  weekly: 0,
  monthly: 0
});
const calculateSpent = (transactions) => {
  const today = new Date();

  let daily = 0;
  let weekly = 0;
  let monthly = 0;

  transactions.forEach((tx) => {
    const txDate = new Date(tx.createdAt);
    const diffDays = (today - txDate) / (1000 * 60 * 60 * 24);

    // DAILY
    if (today.toDateString() === txDate.toDateString()) {
      daily += tx.amount;
    }

    // WEEKLY
    if (diffDays <= 7) {
      weekly += tx.amount;
    }

    // MONTHLY
    if (
      today.getMonth() === txDate.getMonth() &&
      today.getFullYear() === txDate.getFullYear()
    ) {
      monthly += tx.amount;
    }
  });

  return { daily, weekly, monthly };
};


useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/userTransaction/Transaction/${userId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

      const totals = calculateSpent(res.data.data);

      setSpent(totals);

    } catch (err) {
      console.log(err);
    }
  };

  fetchTransactions();
}, []);

  const [inputValue, setInputValue] = useState("");

  const handleSave = async () => {
    if (!inputValue) return;

    const updatedKey = keyMap[activeTab];

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/expense/Expense-update`,
        { [updatedKey]: inputValue },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setLimits(res.data.data);
      setInputValue("");

    } catch (err) {
      console.log(err);
    }
  };

  const percentage = Math.min(
    (spent[activeTab] / limits[keyMap[activeTab]]) * 100,
    100
  );

  if (loading) return <p>Loading....</p>;

  return (
    <div className="el-container">
      <h2 className="el-title">Manage Expense Limit</h2>

      <div className="el-tabs">
        {["daily", "weekly", "monthly"].map((tab) => (
          <button
            key={tab}
            className={`el-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="el-card">
        <div className="el-row">
          <div>
            <p className="el-label">Limit</p>
            <h3 className="el-amount">
              ₹ {limits[keyMap[activeTab]]}
            </h3>
          </div>

          <div>
            <p className="el-label">Spent</p>
            <h3 className="el-spent">
              ₹ {spent[activeTab]}
            </h3>
          </div>
        </div>

        <div className="el-progress-bar">
          <div
            className="el-progress"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="el-percent">{percentage.toFixed(0)}% used</p>
      </div>

      <div className="el-card">
        <p className="el-label">Update {activeTab} Limit</p>

        <div className="el-input-row">
          <input
            type="number"
            placeholder={`Enter ${activeTab} limit`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLimit;
