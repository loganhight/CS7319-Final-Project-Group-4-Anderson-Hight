import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css';

const TransactionForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = { date, amount: parseFloat(amount), notes };
    axios.post('http://127.0.0.1:5000/api/transactions', newTransaction)
      .then(response => {
        setDate('');
        setAmount('');
        setNotes('');
      })
      .catch(error => console.log("Error adding transaction:", error));
  };

  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <label>Notes:</label>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TransactionForm;
