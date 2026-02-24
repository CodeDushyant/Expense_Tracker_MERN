import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip , LineChart, Line 

} from "recharts";
import { ChevronLeft, ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import "./MonthlyView.css";

const MonthlyView = () => {

  const [monthlyData, setMonthlyData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.vite_api_base_url}/api/v1/monthlyExpense`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMonthlyData(res.data.data);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchMonthly();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!monthlyData.length) return (
    <div className="mv-empty-state">
      <div className="mv-empty-card">

        <div className="mv-empty-icon">📊</div>

        <h2>No Monthly Data</h2>

        <p>
          You haven’t added any transactions yet for this month.
          Start tracking your expenses to see insights here.
        </p>

        <div className="mv-empty-graph">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  );

  const currentMonthData = monthlyData[currentIndex];
  const lastMonthData = monthlyData[currentIndex + 1];

  const expenses = currentMonthData.transactions || [];

  // 📊 chart data
  const last12Months = monthlyData.slice(0, 12).reverse();
 const chartData = last12Months.map(item => ({
  month: new Date(item.year, item.month - 1)
    .toLocaleString("default", { month: "short" }),
  amount: item.totalAmount
}));


  // 📈 stats
  const totalExpense = currentMonthData.totalAmount;

  const transactionCount = currentMonthData.totalTransaction;

  const lastMonthTotal = lastMonthData?.totalAmount || 0;

  const percentChange = lastMonthTotal
    ? ((totalExpense - lastMonthTotal) / lastMonthTotal) * 100
    : 0;

  const monthName = new Date(
    currentMonthData.year,
    currentMonthData.month - 1
  ).toLocaleString("default", { month: "long", year: "numeric" });

  
  return (
    <div className="mv-main-container">

      {/* HEADER */}
      <div className="mv-header-card">
        <button
          className="mv-nav-btn"
          onClick={() =>
            setCurrentIndex(prev => Math.min(prev + 1, monthlyData.length - 1))
          }
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="mv-month-display">{monthName}</h2>

        <button
          className="mv-nav-btn"
          onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* STATS */}
      <div className="mv-stats-row">

        <div className="mv-stat-item">
          <div className="mv-label-group">
            <span className="mv-stat-label">Total Expenses</span>
            <TrendingDown size={16} className="mv-icon-purple" />
          </div>
          <div className="mv-stat-value">₹{totalExpense}</div>
        </div>

        <div className="mv-stat-item">
          <span className="mv-stat-label">Transactions</span>
          <div className="mv-stat-value">{transactionCount}</div>
        </div>

        <div className="mv-stat-item">
          <div className="mv-label-group">
            <span className="mv-stat-label">vs Last Month</span>
            <TrendingUp size={16} className="mv-icon-green" />
          </div>

          <div className="mv-stat-value">
            {percentChange.toFixed(1)}%
          </div>
        </div>

      </div>

      {/* CHART */}
      <div className="mv-grid-card mv-chart-section">
  <h3 className="mv-card-title">Monthly Spending Trend</h3>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#6366f1"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>


    </div>
  );
};

export default MonthlyView;
