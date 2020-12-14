import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';
import { postLogin, validateAuthTokens } from '../api';

const Login = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const previousPage = referrer || '/';

  useEffect(() => (
    (authTokens && authTokens.user && authTokens.token) && (
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
    )
  ), []);

  if (isLoggedIn) {
    return <Redirect to={previousPage} />;
  }

  const handleSubmit = () => postLogin(
    email,
    password,
    setAuthTokens,
    setIsLoggedIn,
    setIsError,
  );

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
        <button type="submit" onClick={handleSubmit}>Sign In</button>
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
