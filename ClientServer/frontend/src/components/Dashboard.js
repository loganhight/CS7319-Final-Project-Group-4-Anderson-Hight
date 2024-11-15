// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Fetch financial summary
    axios.get('http://localhost:5000/api/summary')
      .then(response => {
        const { total_income, total_expenses, net_balance } = response.data;
        setTotalIncome(total_income);
        setTotalExpenses(total_expenses);
        setNetBalance(net_balance);
      })
      .catch(error => console.error('Error fetching summary:', error));

    // Fetch recent transactions
    axios.get('http://localhost:5000/api/transactions')
      .then(response => {
        // Display the three most recent transactions
        const transactions = response.data.slice(0, 3);
        setRecentTransactions(transactions);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h2>PFMA</h2>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/add">Add Transaction</a></li>
            <li><a href="/list">View Transactions</a></li>
          </ul>
        </nav>
      </div>
      <div className="dashboard-container">
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
            {recentTransactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.date} - ${transaction.amount} ({transaction.notes})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
