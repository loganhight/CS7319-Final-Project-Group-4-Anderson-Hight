import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState({ total_income: 0, total_expenses: 0, net_balance: 0 });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/summary')
      .then(response => setSummary(response.data))
      .catch(error => console.log("Error fetching summary: ", error));
  }, []);

  return (
    <div>
      <h2>Financial Summary</h2>
      <p><strong>Total Income:</strong> ${summary.total_income}</p>
      <p><strong>Total Expenses:</strong> ${summary.total_expenses}</p>
      <p><strong>Net Balance:</strong> ${summary.net_balance}</p>
    </div>
  );
};

export default Dashboard;
