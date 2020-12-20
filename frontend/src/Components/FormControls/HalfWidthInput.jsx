import React from 'react'
import PropTypes from 'prop-types'

const HalfWidthInput = ({ name, field, setField, type, error, right }) =>
  <div className={`form-group col-10 col-md-5 offset-1 ${right && 'offset-md-0'}`}>
    <label htmlFor={name} className="control-label">{name}</label>
    <input
      id={name}
      value={field}
      onChange={e => setField(e.target.value)}
      type={type}
      className="form-control"
    />
    <div key={error} className="text-danger">{error}</div>
  </div>

HalfWidthInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  right: PropTypes.bool.isRequired
}

export default HalfWidthInput
