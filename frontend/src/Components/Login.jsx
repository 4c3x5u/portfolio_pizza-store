import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../context/auth';
import { postLogin, validateAuthTokens } from '../api';

import Email from './FormControls/Email';
import Password from './FormControls/Password';
import RememberMe from './FormControls/RememberMe';
import SubmitButton from './FormControls/SubmitButton';

const Login = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleSubmit = () => (
    postLogin(email, password, setAuthTokens, setIsLoggedIn, setIsError)
  );

  return (
    <section id="Login">
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">SIGN IN</h2>
          </article>

          <form className="col-10 offset-1">
            <div className="Form form-row">
              <Email email={email} setEmail={setEmail} />
              <Password password={password} setPassword={setPassword} />
              <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} />
            </div>
          </form>

          <SubmitButton handleSubmit={handleSubmit} />
          <div className="Register col-10 offset-1">
            <Link to="/member/signup">Don&apos;t have an account?</Link>
          </div>
          {isError && <div>The username or pasword provided were incorrect.</div>}

        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  referrer: PropTypes.string,
};

Login.defaultProps = {
  referrer: '/',
};

export default Login;
