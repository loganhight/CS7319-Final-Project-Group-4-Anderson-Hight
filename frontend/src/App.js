import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Personal Finance Management App</h1>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/add" component={TransactionForm} />
          <Route path="/list" component={TransactionList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
