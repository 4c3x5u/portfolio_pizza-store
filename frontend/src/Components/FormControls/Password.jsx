import React from 'react'
import PropTypes from 'prop-types'

const Password = ({ password, setPassword, validator }) =>
  <div className="form-group col-10 offset-1">
    <label htmlFor="password" className="control-label">
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
    <span className="text-danger">{validator}</span>
  </div>

Password.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  validator: PropTypes.any.isRequired
}

export default Password
