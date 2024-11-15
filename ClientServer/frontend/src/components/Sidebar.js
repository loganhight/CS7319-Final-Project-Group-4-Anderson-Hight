import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>PFMA</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/add-transaction">Add Transaction</Link>
                    </li>
                    <li>
                        <Link to="/transactions">View Transactions</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
