import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/summary')
      .then(response => {
        setTotalIncome(response.data.total_income);
        setTotalExpenses(response.data.total_expenses);
        setNetBalance(response.data.net_balance);
      })
      .catch(error => console.log("Error fetching summary:", error));

    axios.get('http://127.0.0.1:5000/api/transactions')
      .then(response => {
        setRecentTransactions(response.data.slice(0, 3)); // Show the last 3 transactions
      })
      .catch(error => console.log("Error fetching transactions:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>PFMA</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>${totalIncome}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        <div className="card">
          <h3>Net Balance</h3>
          <p>${netBalance}</p>
        </div>
      </div>
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map(trans => (
            <li key={trans.id}>
              {trans.date} - ${trans.amount} ({trans.notes})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
