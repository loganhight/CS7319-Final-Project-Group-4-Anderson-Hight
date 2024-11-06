// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = collection(db, 'transactions');
      const transactionsSnapshot = await getDocs(transactionsCollection);
      const transactions = transactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate totals
      let income = 0;
      let expenses = 0;
      transactions.forEach(transaction => {
        if (transaction.amount > 0) {
          income += transaction.amount;
        } else {
          expenses += transaction.amount;
        }
      });

      setTotalIncome(income);
      setTotalExpenses(Math.abs(expenses));
      setNetBalance(income + expenses);
      setRecentTransactions(transactions.slice(0, 3));
    };

    fetchTransactions();
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
          {recentTransactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.date} - ${transaction.amount} ({transaction.notes})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
