import React from 'react'
import PropTypes from 'prop-types'

const Email = ({ email, setEmail, validator }) =>
  <div className="form-group col-10 offset-1">
    <label htmlFor="email" className="control-label">Email</label>
    <input
      id="email"
      type="email"
      name="email"
      className="form-control"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    <span className="text-danger">{validator}</span>
  </div>

Email.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  validator: PropTypes.any
}

export default Email
