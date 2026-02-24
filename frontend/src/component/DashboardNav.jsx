import React from 'react';
import { LayoutGrid, RefreshCw, Calendar , Wallet } from 'lucide-react'; // Icons import kiye
import './DashboardNav.css';

const DashboardNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="dn-nav-wrapper">
      <div className="dn-nav-container">
        <button 
          className={`dn-nav-btn ${activeTab === 'overview' ? 'dn-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <LayoutGrid size={18} className="dn-icon" />
          <span>Overview</span>
        </button>

        <button 
          className={`dn-nav-btn ${activeTab === 'recurring' ? 'dn-active' : ''}`}
          onClick={() => setActiveTab('recurring')}
        >
          <RefreshCw size={18} className="dn-icon" />
          <span>Recurring Expenses</span>
        </button>

        <button 
          className={`dn-nav-btn ${activeTab === 'monthly' ? 'dn-active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          <Calendar size={18} className="dn-icon" />
          <span>Monthly View</span>
        </button>

       {/* ✅ NEW BUTTON */}
        <button 
          className={`dn-nav-btn ${activeTab === 'limit' ? 'dn-active' : ''}`}
          onClick={() => setActiveTab('limit')}
        >
          <Wallet size={18} className="dn-icon" />
          <span>Expense Limit</span>
        </button>
        
      </div>
    </div>
  );
}

export default DashboardNav;