/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import { useAuth } from '../../../context/auth';
import { postRegister, validateAuthTokens } from '../../../api';

import Email from '../../FormControls/Email';
import Password from '../../FormControls/Password';
import SubmitButton from '../../FormControls/SubmitButton';
import { setNavLinkActive, arrayEmpty, handleFormKeyUp } from '../../Order/util';

import './Register.sass';

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const validator = new SimpleReactValidator();

  useEffect(() => {
    setNavLinkActive('Register');
    if (authTokens && authTokens.user && authTokens.token) {
      validateAuthTokens(authTokens.user, authTokens.token)
        .then((res) => res.status === 200 && setIsLoggedIn(true));
    }
  }, []);

  const handleSubmit = (e) => {
    if (e) { e.preventDefault(); }
    if (validator.allValid()) {
      postRegister(email, password, passwordConfirmation)
        .then((res) => {
          if (res.status === 200) {
            setAuthTokens(res.data);
            setIsLoggedIn(true);
          } else {
            setErrors(res.data);
          }
        });
    }
  };

  if (isLoggedIn) { return <Redirect to="/order" />; }

  return (
    <section id="Register">
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">REGISTER</h2>
          </article>

          {validator.showMessages()}

          <form
            className="col-10 offset-1"
            onKeyUp={(e) => handleFormKeyUp(e, handleSubmit, setErrors)}
          >
            <div className="Form form-row">

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

              <Password
                password={passwordConfirmation}
                setPassword={setPasswordConfirmation}
                validator={validator.message('passwordConfirmation', passwordConfirmation, 'required|alpha_num_dash|min:8|max:35')}
              />

              {!arrayEmpty(errors) && (
                <div className="form-group col-12">
                  {errors.map((err) => (
                    <p key={err.msg} className="text-danger">
                      {err.msg}
                    </p>
                  ))}
                </div>
              )}

            </div>

            <SubmitButton
              text="DONE"
              handleSubmit={handleSubmit}
              disabled={!validator.allValid()}
            />

          </form>

          <div className="SignIn col-10 offset-1">
            <Link to="/member/sign-in">
              Already have an account? Click here to sign in.
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;
