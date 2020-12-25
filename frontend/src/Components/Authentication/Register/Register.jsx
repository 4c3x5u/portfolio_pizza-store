import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useAuth } from '../../../context/auth'
import { postRegister, validateAuthTokens } from '../../../api'
import Email from '../../FormControls/Email'
import Password from '../../FormControls/Password'
import SubmitButton from '../../FormControls/SubmitButton'
import SimpleReactValidator from 'simple-react-validator'
import './Register.sass'
import { setNavLinkActive } from '../../Order/util'

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { authTokens, setAuthTokens } = useAuth()
  const validator = new SimpleReactValidator()

  useEffect(
    () => {
      setNavLinkActive('Register')
      authTokens && authTokens.user && authTokens.token &&
        validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
    },
    []
  )

  const handleSubmit = e => {
    e.preventDefault()
    validator.allValid() &&
      postRegister(email, password, passwordConfirmation)
        .then((result) => {
          if (result.status === 200) {
            setAuthTokens(result.data)
            setIsLoggedIn(true)
          }
        })
        .catch(err => {
          setErrorMessage(`Invalid ${err.response.data.errors[0].param}.`)
        })
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

              {errorMessage &&
                <div className="form-group col-12">
                  <span className="text-danger">
                    {errorMessage}
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
            <Link to="/member/sign-in">Already have an account?</Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Register
