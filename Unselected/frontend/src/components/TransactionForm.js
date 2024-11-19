import React, { useState } from 'react';
import './TransactionForm.css';
import { db } from '../firebase'; // Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const TransactionForm = () => {
    const [form, setForm] = useState({
        date: '',
        amount: '',
        notes: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const transactionsCollection = collection(db, 'transactions');
            await addDoc(transactionsCollection, form);

            setSuccessMessage('Transaction added successfully!');
            setForm({ date: '', amount: '', notes: '' }); // Reset form fields

            setTimeout(() => {
                setSuccessMessage(''); // Clear success message after a few seconds
            }, 3000);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className="transaction-form-container">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleInputChange}
                        placeholder="Enter amount (e.g., 100.00)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={form.notes}
                        onChange={handleInputChange}
                        placeholder="Add notes (optional)"
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Add Transaction
                </button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default TransactionForm;
