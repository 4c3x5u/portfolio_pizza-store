import React from 'react'
import PropTypes from 'prop-types'

const RememberMe = ({ rememberMe, setRememberMe }) =>
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
      <label htmlFor="remember-me" className="control-label">
        Remember Me
      </label>
    </div>
  </div>

RememberMe.propTypes = {
  rememberMe: PropTypes.bool.isRequired,
  setRememberMe: PropTypes.func.isRequired
}

export default RememberMe
