// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/add" className="nav-link">Add Transaction</Link>
        <Link to="/list" className="nav-link">View Transactions</Link>
      </nav>
    </header>
  );
};

export default Header;
