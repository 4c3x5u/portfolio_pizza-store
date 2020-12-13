import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Route exact path="/login" render={() => <Login referrer="/" />} />
    </Router>
  );
}

export default App;
