import React from 'react'
import PropTypes from 'prop-types'

const Password = ({ password, setPassword }) =>
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
    <span
      className="field-validation-valid text-danger"
      data-valmsg-for="password"
      data-valmsg-replace="true"
    />
  </div>

Password.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Password
