import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { AuthContext } from './context/auth';

import Home from './Components/Home/Home';
import SignIn from './Components/Authentication/SignIn/SignIn';
import Register from './Components/Authentication/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Order from './Components/Order/Order';
import OrderStore from './Components/Order/Context/OrderStore';
import NotFound from './Components/NotFound/NotFound';

import './App.sass';

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <OrderStore>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/member/sign-in" component={SignIn} />
            <Route exact path="/member/register" component={Register} />
            <Route path="/order" component={Order} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </OrderStore>
    </AuthContext.Provider>
  );
};

export default App;
