import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';

const Login = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const previousPage = referrer || '/';

  useEffect(() => {
    if (authTokens) {
      axios.post('http://localhost:4000/validateToken', {
        user: authTokens.user,
        token: authTokens.token,
      }).then((result) => {
        if (result.status === 200) {
          setIsLoggedIn(true);
        }
      }).catch(() => {
        setIsLoggedIn(false);
      });
    }
  });

  const postLogin = () => {
    axios.post('http://localhost:4000/login', {
      email,
      password,
    }).then((result) => {
      if (result.status === 200) {
        setAuthTokens(result.data);
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

Login.propTypes = {
  referrer: PropTypes.string,
};

Login.defaultProps = {
  referrer: '/',
};

export default Login;
