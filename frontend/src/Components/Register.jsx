import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';
import { postRegister, validateAuthTokens } from '../api';
import Email from './FormControls/Email';
import Password from './FormControls/Password';
import SubmitButton from './FormControls/SubmitButton';

const Register = ({ referrer }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => (
    (authTokens && authTokens.user && authTokens.token) && (
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
    )
  ), []);

  const handleSubmit = () => (
    postRegister(email, password, passwordConfirmation, setAuthTokens, setIsLoggedIn, setIsError)
  );

  if (isLoggedIn) { return <Redirect to={referrer} />; }

  return (
    <section id="Register">
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">REGISTER</h2>
          </article>

          <form className="col-10 offset-1">
            <div className="Form form-row">
              <Email email={email} setEmail={setEmail} />
              <Password password={password} setPassword={setPassword} />
              <Password password={passwordConfirmation} setPassword={setPasswordConfirmation} />
            </div>
            <SubmitButton handleSubmit={handleSubmit} />
          </form>

          <div className="Login col-10 offset-1">
            <Link to="/member/login">Already have an account?</Link>
          </div>

          {isError && <div>The username or pasword provided were incorrect.</div>}

        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  referrer: PropTypes.string,
};

Register.defaultProps = {
  referrer: '/',
};

export default Register;
