/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../context/auth';

const Login = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { setAuthTokens } = useAuth();
  const previousPage = referrer || '/';

  const postLogin = () => {
    // The url below is supposed to be to a website that distributes tokens
    axios.post('http://localhost:4000/login', {
      email,
      password,
    }).then((result) => {
      if (result.status === 200) {
        // setAuthTokens(result.data);
        setIsLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(() => (setIsError(true)));
  };

  if (isLoggedIn) {
    return <Redirect to={previousPage} />;
  }

  return (
    <>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => (setEmail(e.target.value))}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => (setPassword(e.target.value))}
          placeholder="password"
        />
        <button type="submit" onClick={postLogin}>Sign In</button>
      </div>
      <Link to="/signup">Don&apos;t have an account?</Link>
      {isError && <div>The username or pasword provided were incorrect.</div>}
    </>
  );
};

export default Login;
