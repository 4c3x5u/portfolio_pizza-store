import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';
import { postRegister, validateAuthTokens } from '../api';

const Register = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const previousPage = referrer;

  useEffect(() => (
    (authTokens && authTokens.user && authTokens.token) && (
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
    )
  ), []);

  const handleSubmit = () => postRegister(
    email,
    password,
    passwordConfirmation,
    setAuthTokens,
    setIsLoggedIn,
    setIsError,
  );

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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => (setPasswordConfirmation(e.target.value))}
          placeholder="password"
        />
        <button type="submit" onClick={handleSubmit}>Sign In</button>
      </div>
      <Link to="/login">Already have an account?</Link>
      {isError && <div>The provided passwords do not match.</div>}
    </>
  );
};

Register.propTypes = {
  referrer: PropTypes.string,
};

Register.defaultProps = {
  referrer: '/',
};

export default Register;
