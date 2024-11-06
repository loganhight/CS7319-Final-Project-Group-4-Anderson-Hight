// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date');

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter(trans => trans.id !== id));
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  const filteredTransactions = transactions.filter(trans =>
    trans.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transaction-list-container">
      <div className="transaction-controls">
        <h2 className="transaction-heading">Transactions</h2>
        <div className="transaction-controls-right">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>
      <div className="transaction-table">
        <div className="transaction-table-header">
          <div>Date</div>
          <div>Amount</div>
          <div>Notes</div>
          <div>Actions</div>
        </div>
        {filteredTransactions.map(trans => (
          <div className="transaction-table-row" key={trans.id}>
            <div>{trans.date}</div>
            <div>{trans.amount > 0 ? `+${trans.amount}` : trans.amount}</div>
            <div>{trans.notes}</div>
            <div>
              <button className="edit-button">Edit</button>
              <button className="delete-button" onClick={() => handleDelete(trans.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
