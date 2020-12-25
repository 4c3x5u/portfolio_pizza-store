/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { useAuth } from '../../../context/auth';
import { postSignIn, validateAuthTokens } from '../../../api';
import Email from '../../FormControls/Email';
import Password from '../../FormControls/Password';
import SubmitButton from '../../FormControls/SubmitButton';
import './SignIn.sass';
import { setNavLinkActive } from '../../Order/util';

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const validator = new SimpleReactValidator();

  useEffect(() => {
    setNavLinkActive('SignIn');
    if (authTokens && authTokens.user && authTokens.token) {
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn);
    }
  }, []);

  const handleSubmit = (e) => {
    if (e) { e.preventDefault(); }
    if (validator.allValid()) {
      postSignIn(email, password, setAuthTokens, setIsLoggedIn, setErrorMessage);
    }
  };

  if (isLoggedIn) { return <Redirect to="/order" />; }

  return (
    <section id="SignIn">
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">SIGN IN</h2>
          </article>

          {validator.showMessages()}

          <form
            className="col-10 offset-1"
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
          >
            <div className="Form form-row text-center">
              <Email
                email={email}
                setEmail={setEmail}
                validator={validator.message('email', email, 'required|email')}
              />

              <Password
                password={password}
                setPassword={setPassword}
                validator={validator.message('password', password, 'required|alpha_num_dash|min:8|max:35')}
              />

              {errorMessage && (
                <div className="form-group col-12">
                  <span className="text-danger">
                    {errorMessage}
                  </span>
                </div>
              )}

            </div>
          </form>

          <SubmitButton
            text="Sign In"
            handleSubmit={handleSubmit}
            disabled={!validator.allValid()}
          />

          <div className="Register col-10 offset-1">
            <Link to="/member/register">Don&apos;t have an account?</Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignIn;
