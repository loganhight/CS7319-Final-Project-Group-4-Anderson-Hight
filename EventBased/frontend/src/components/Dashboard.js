import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      let income = 0;
      let expenses = 0;
      const transactions = [];

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const amount = parseFloat(data.amount);
        transactions.push({ ...data, id: doc.id });

        if (amount > 0) {
          income += amount;
        } else {
          expenses += amount;
        }
      });

      setTotalIncome(income);
      setTotalExpenses(Math.abs(expenses));
      setNetBalance(income + expenses);
      setRecentTransactions(transactions.slice(0, 3)); // Show the last 3 transactions
    });

    return () => unsubscribe(); // Cleanup listener on unmount
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
