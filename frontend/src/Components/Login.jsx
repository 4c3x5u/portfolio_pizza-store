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

  const handleSubmit = () => postLogin(
    email,
    password,
    setAuthTokens,
    setIsLoggedIn,
    setIsError,
  );

  const emailControl = () => (
    <div className="form-group col-10 offset-1">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email" className="control-label">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        className="form-control"
        value={email}
        onChange={(e) => (setEmail(e.target.value))}
      />
      <span
        className="field-validation-valid text-danger"
        data-valmsg-for="email"
        data-valmsg-replace="true"
      />
    </div>
  );

  const passwordControl = () => (
    <div className="form-group col-10 offset-1">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="password"
        className="control-label"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        className="form-control"
        value={password}
        onChange={(e) => (setPassword(e.target.value))}
      />
      <span
        className="field-validation-valid text-danger"
        data-valmsg-for="password"
        data-valmsg-replace="true"
      />
    </div>
  );

  const rememberMeControl = () => (
    <div className="form-group col-10 offset-1">
      <div className="checkbox">
        <input
          id="remember-me"
          type="checkbox"
          name="remember-me"
          className="text-danger"
          value={rememberMe}
          onClick={() => setRememberMe(!rememberMe)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="remember-me" className="control-label">
          Remember Me
        </label>
      </div>
    </div>
  );

  const formFooter = () => (
    <>
      <div className="Done form-group col-10 offset-1">
        <input
          type="submit"
          value="Sign In"
          className="Confirm btn btn-default"
          onClick={handleSubmit}
        />
      </div>

      <div className="Register col-10 offset-1">
        <Link to="/member/signup">Don&apos;t have an account?</Link>
      </div>

      {isError && <div>The username or pasword provided were incorrect.</div>}
    </>
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
              {emailControl()}
              {passwordControl()}
              {rememberMeControl()}
            </div>
            {formFooter()}
          </form>

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
