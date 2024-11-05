// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = collection(db, 'transactions');
      const transactionsSnapshot = await getDocs(transactionsCollection);
      const transactionsData = transactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(transactionsData);
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(transactions.filter(trans => trans.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction. Please try again.');
    }
  };

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
              <button className="delete-button" onClick={() => handleDelete(trans.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
