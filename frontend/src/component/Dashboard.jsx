import React, { useEffect } from 'react'
import DashboardNav from './DashboardNav'
// import Summary from './Summary'
import ExpenseSummary from './ExpenseSummary'
import AddExpense from './AddExpense'
import RecentExpenses from './RecentExpenses'
import ExpenseByCategory from './ExpenseByCategory'
import AddRecurringExpense from './AddRecurringExpense'
import ActiveRecurringExpenses from './ActiveRecurringExpenses'
import RecurringTopBar from './RecurringTopBar'
import MonthlyView from './MonthlyView'
import ExpenseLimit from './ExpenseLimit'
import { useState } from 'react'

import './Dashboard.css'
import axios from 'axios'
const Dashboard = () => {
  const [render,Setrender] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [recurringexpenses, setRecurringExpenses] = useState([]);
  const token = localStorage.getItem("token");
 const totalAmount = recurringexpenses
  .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
 const LeftAmount = recurringexpenses
  .filter(e => e.isActive)
  .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const userId = localStorage.getItem('userId');
  // const id = findOne(userID);
  async function fetchExpenses(){
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/userTransaction/Transaction/${userId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    
    setExpenses(res.data.data);
  }

  async function fetchRecurringExpense() {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/recurringExpense/${userId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    setRecurringExpenses(res.data.data);

  }
  useEffect(()=>{
    setTimeout(()=>{
      fetchExpenses();
      fetchRecurringExpense();
    },0)
  },[])

 const onDelete = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/userTransaction/Transaction/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data.success) {
      // Use _id here to match MongoDB's naming convention
      setExpenses(prev => prev.filter(e => e._id !== id));
    }
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Could not delete the item.");
  }
};
 const onDeleteRecurring = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/recurringExpense/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data.success) {
      // Use _id here to match MongoDB's naming convention
      setRecurringExpenses(prev => prev.filter(e => e._id !== id));
    }
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Could not delete the item.");
  }
};
const onMark = async (id) => {
  
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/recurringExpense/mark/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedExpense = res.data.data;

    setRecurringExpenses(prev =>
      prev.map(e => e._id === id ? updatedExpense : e)
    );



  } catch (error) {
    console.error("Status update failed:", error);
  }
};



  const [activeTab, setActiveTab] = useState('overview');
  return (
    <>
    <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab}></DashboardNav>
    {activeTab === 'overview' && (
  <div className="dashboard-container">

    <div className="dashboard-grid-top">
      <ExpenseSummary expenses={expenses} />
      {expenses && expenses.length > 0 ? (
  <ExpenseByCategory expenses={expenses} />
) : (
  <AddExpense setExpenses={setExpenses} />
)}
    </div>

    <>
      {expenses && expenses.length > 0 && 
        <div  className="dashboard-grid-bottom">
          <AddExpense setExpenses={setExpenses} />
              <RecentExpenses expenses={expenses} onDelete={onDelete} />
        </div> }
    </>

  </div>
)}
    {activeTab === 'recurring' && (
  <div className="recurring-container">
    <br />
    <div className="recurring-grid-top">
      <RecurringTopBar totalAmount={totalAmount} LeftAmount={LeftAmount}/>
    </div>
<br />
    <div className="recurring-grid-bottom">
      <AddRecurringExpense setRecurringExpenses={setRecurringExpenses}/>
      <ActiveRecurringExpenses
      setRecurringExpenses={setRecurringExpenses}
       recurringexpenses={recurringexpenses}
       onDeleteRecurring={onDeleteRecurring}
       setExpenses={setExpenses}
       onMark={onMark}
        />
    </div>


  </div>
)}
    {activeTab === 'monthly' && (
  <div className="monthly-container">
    <br />
<MonthlyView expenses={expenses} />
<br />


  </div>
)}
    {activeTab === 'limit' && (
  <div className="limit-container">
    <br />
<ExpenseLimit/>
<br />


  </div>
)}

   

    </>
  )
}

export default Dashboard