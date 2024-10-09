import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onFormSubmit }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { date, amount: parseFloat(amount), notes };
    axios.post('http://127.0.0.1:5000/api/transactions', newTransaction)
      .then(response => {
        onFormSubmit(response.data);
        setDate('');
        setAmount('');
        setNotes('');
      })
      .catch(error => console.log("Error adding transaction: ", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>
      <label>Date: </label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <label>Amount: </label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <label>Notes: </label>
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
