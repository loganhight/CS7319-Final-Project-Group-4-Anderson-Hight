import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Dashboard</Link> | 
          <Link to="/add">Add Transaction</Link> | 
          <Link to="/list">View Transactions</Link>
        </nav>
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
