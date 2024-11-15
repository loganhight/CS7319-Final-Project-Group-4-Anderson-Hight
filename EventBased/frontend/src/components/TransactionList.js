import React, { useState, useEffect } from 'react';
import './TransactionList.css';
import { db } from '../firebase'; // Firebase configuration
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]); // Stores the list of transactions
    const [editingTransaction, setEditingTransaction] = useState(null); // Tracks the transaction being edited
    const [editForm, setEditForm] = useState({ date: '', amount: '', notes: '' }); // Stores the current form data for editing
    const [sortBy, setSortBy] = useState(''); // Tracks the current sorting option

    // Fetch transactions from Firebase
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactionsCollection = collection(db, 'transactions');
                const snapshot = await getDocs(transactionsCollection);
                const transactionList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTransactions(transactionList);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    // Handle edit button click
    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction.id);
        setEditForm({
            date: transaction.date,
            amount: transaction.amount,
            notes: transaction.notes,
        });
    };

    // Handle delete button click
    const handleDeleteClick = async (transactionId) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteDoc(doc(db, 'transactions', transactionId));
                setTransactions((prevTransactions) =>
                    prevTransactions.filter((transaction) => transaction.id !== transactionId)
                );
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    // Handle input changes in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    // Handle save button click
    const handleSaveClick = async () => {
        try {
            const transactionDoc = doc(db, 'transactions', editingTransaction);
            await updateDoc(transactionDoc, editForm);
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction.id === editingTransaction
                        ? { ...transaction, ...editForm }
                        : transaction
                )
            );
            setEditingTransaction(null); // Exit edit mode
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    // Handle cancel button click
    const handleCancelClick = () => {
        setEditingTransaction(null);
    };

    // Handle sort dropdown change
    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        setSortBy(sortOption);

        const sortedTransactions = [...transactions];
        if (sortOption === 'date') {
            // Sort by date (most recent first)
            sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === 'amount') {
            // Sort by amount (highest first)
            sortedTransactions.sort((a, b) => b.amount - a.amount);
        }
        setTransactions(sortedTransactions);
    };

    return (
        <div className="transaction-list">
            <h2>Transactions</h2>
            <div className="sort-container">
                <label htmlFor="sort">Sort By: </label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            {editingTransaction === transaction.id ? (
                                <>
                                    <td>
                                        <input
                                            type="date"
                                            name="date"
                                            value={editForm.date}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={editForm.amount}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={editForm.notes}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveClick}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.notes}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                        {editingTransaction !== transaction.id && (
                                            <button onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
