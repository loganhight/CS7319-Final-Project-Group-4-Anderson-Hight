// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Header from './components/Header'; // Import the Header

const App = () => {
  return (
    <Router>
      <Header /> {/* Use the Header component */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<TransactionForm />} />
          <Route path="/list" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
