import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useAuth } from '../../../context/auth'
import { postRegister, validateAuthTokens } from '../../../api'
import Email from '../../FormControls/Email'
import Password from '../../FormControls/Password'
import SubmitButton from '../../FormControls/SubmitButton'
import SimpleReactValidator from 'simple-react-validator'
import './Register.sass'

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
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
      postRegister(email, password, passwordConfirmation, setAuthTokens, setIsLoggedIn, setIsError)
  }

  if (isLoggedIn) { return <Redirect to="/order" /> }

  return (
    <section id="Register">
      <div className="PageContainer container-fluid">
        <div className="PageRow row">

          <article className="PageHead col-10 offset-1">
            <Link to="/" className="BackButton">BACK</Link>
            <h2 className="Header">REGISTER</h2>
          </article>

          {validator.showMessages()}

          <form className="col-10 offset-1">
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

              {isError &&
                <div className="form-group col-12">
                  <span className="text-danger">
                    Incorrect email or password.
                  </span>
                </div>}

            </div>

            <SubmitButton
              text="Register"
              handleSubmit={handleSubmit}
              disabled={!validator.allValid()}
            />

          </form>

          <div className="Register col-10 offset-1">
            <Link to="/member/login">Already have an account?</Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Register
