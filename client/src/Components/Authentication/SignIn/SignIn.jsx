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
import { setNavLinkActive, arrayEmpty, handleFormKeyUp } from '../../Order/util';

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const validator = new SimpleReactValidator();

  useEffect(() => {
    setNavLinkActive('SignIn');
    if (authTokens && authTokens.user && authTokens.token) {
      validateAuthTokens(authTokens.user, authTokens.token)
        .then((res) => res.status === 200 && setIsLoggedIn(true));
    }
  }, []);

  const handleSubmit = (e) => {
    if (e) { e.preventDefault(); }
    if (validator.allValid()) {
      postSignIn(email, password).then((res) => {
        if (res.status === 200) {
          setAuthTokens(res.data);
          setIsLoggedIn(true);
        } else {
          console.log(`res.data: ${JSON.stringify(res.data)}`);
          setErrors(res.data);
        }
      });
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
            onKeyUp={(e) => handleFormKeyUp(e, handleSubmit, setErrors)}
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

              {!arrayEmpty(errors) && (
                <div className="form-group col-12">
                  {console.log(`errors: ${JSON.stringify(errors)}`)}
                  {errors.map((err) => (
                    <span key={err.msg} className="text-danger">
                      {err.msg}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </form>

          <SubmitButton
            text="DONE"
            handleSubmit={handleSubmit}
            disabled={!validator.allValid()}
          />

          <div className="Register col-10 offset-1">
            <Link to="/member/register">
              Don&apos;t have an account? Click here to register.
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignIn;
