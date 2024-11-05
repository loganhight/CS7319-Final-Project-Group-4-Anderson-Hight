import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './TransactionForm.css';

const TransactionForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate amount
    if (isNaN(amount) || amount.trim() === '') {
      alert('Please enter a valid number for the amount.');
      return;
    }

    try {
      // Add the transaction to Firestore
      await addDoc(collection(db, 'transactions'), {
        date, // Date in string format
        amount: parseFloat(amount), // Convert amount to number
        notes // Notes as a string
      });

      // Clear form fields
      setDate('');
      setAmount('');
      setNotes('');
      alert('Transaction added successfully!');
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  };

  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Notes:</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional"
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TransactionForm;
