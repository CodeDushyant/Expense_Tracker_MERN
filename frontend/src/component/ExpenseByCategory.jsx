import React from "react";
import "./ExpenseByCategory.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = {
  Food: "#F87171",    
  Utilities: "#2DD4BF",    
  Healthcare: "#f43a55",     
  Rent: "#60A5FA",        
  EMI: "#FACC15",           
  Subscription: "#A78BFA",         
  Transportation: "#FB923C", 
  Entertainment: "#818CF8",  
  Other: "#5a7191",
  RecurringExpense: "rgb(12, 100, 159)"           
};
const ExpenseByCategory = ({ expenses }) => {

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const dataWithPercent = data.map(d => ({
    ...d,
    percent: ((d.value / total) * 100).toFixed(0)
  }));

  return (
    <div className="category-card">
      <h2>Expenses by Category</h2>

      <div className="chart-wrap">
        <PieChart width={520} height={360}>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            outerRadius={95}
            dataKey="value"
            label={({ name, percent }) => `${name} ${percent}%`}
            paddingAngle={5}
          >
            {dataWithPercent.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.name] || "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Legend List */}
      <div className="legend">
        {dataWithPercent.map(item => (
          <div key={item.name} className="legend-row">
            <div className="legend-left">
              <span
                className="dot"
                style={{ background: COLORS[item.name] }}
              />
              {item.name}
            </div>

            <div className="legend-amount">
              ₹{item.value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseByCategory;
