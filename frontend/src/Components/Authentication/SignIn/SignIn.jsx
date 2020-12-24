import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { useAuth } from '../../../context/auth'
import { postLogin, validateAuthTokens } from '../../../api'
import Email from '../../FormControls/Email'
import Password from '../../FormControls/Password'
import SubmitButton from '../../FormControls/SubmitButton'
import './SignIn.sass'

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authTokens, setAuthTokens } = useAuth()
  const validator = new SimpleReactValidator()

  useEffect(
    () => authTokens && authTokens.user && authTokens.token &&
      validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn),
    []
  )

  const handleSubmit = e => {
    e.preventDefault()
    validator.allValid() &&
      postLogin(email, password, setAuthTokens, setIsLoggedIn, setIsError)
  }

  if (isLoggedIn) { return <Redirect to="/order" /> }

  return (
    <section id="Login">
      {console.log('baban', email)}
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">SIGN IN</h2>
          </article>

          {validator.showMessages()}

          <form className="col-10 offset-1">
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

              {isError &&
                <div className="form-group col-12">
                  <span className="text-danger">
                    Incorrect email or password.
                  </span>
                </div>}

            </div>
          </form>

          <SubmitButton
            text="Sign In"
            handleSubmit={handleSubmit}
            disabled={!validator.allValid()}
          />

          <div className="Register col-10 offset-1">
            <Link to="/member/signup">Don&apos;t have an account?</Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SignIn
