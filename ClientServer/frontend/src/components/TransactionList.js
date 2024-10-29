import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.log("Error fetching transactions:", error));
  }, []);

  return (
    <div className="transaction-list-container">
      <h2>Transactions</h2>
      <div className="transaction-table">
        <div className="transaction-table-header">
          <div>Date</div>
          <div>Amount</div>
          <div>Notes</div>
          <div>Actions</div>
        </div>
        {transactions.map((trans) => (
          <div className="transaction-table-row" key={trans.id}>
            <div>{trans.date}</div>
            <div>{trans.amount > 0 ? `+${trans.amount}` : trans.amount}</div>
            <div>{trans.notes}</div>
            <div>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
