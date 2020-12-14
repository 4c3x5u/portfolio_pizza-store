import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context/auth';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Navbar />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/login" render={() => <Login referrer="/" />} />
        <Route exact path="/register" render={() => <Register referrer="/" />} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
