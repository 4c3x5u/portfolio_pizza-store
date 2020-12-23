import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { AuthContext } from './context/auth'

import Home from './Components/Home/Home'
import Login from './Components/Authentication/Login/Login'
import Register from './Components/Authentication/Register/Register'
import Navbar from './Components/Navbar/Navbar'
import Order from './Components/Order/Order'
import OrderStore from './Components/Order/Context/OrderStore'

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'))
  const [authTokens, setAuthTokens] = useState(existingTokens)

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/member/login" component={Login} />
          <Route exact path="/member/register" component={Register} />
          <OrderStore>
            <Route path="/order" component={Order} />
          </OrderStore>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
