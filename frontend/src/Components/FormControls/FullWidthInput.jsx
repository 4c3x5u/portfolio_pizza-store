import React from 'react'
import PropTypes from 'prop-types'

const FullWidthInput = ({ name, field, setField, type, error }) =>
  <div className="form-group col-10 offset-1">
    <label htmlFor={name} className="control-label">{name}</label>
    <input
      id={name}
      value={field}
      onChange={e => setField(e.target.value)}
      type={type}
      className="form-control"
    />
    {error && <div key={error} className="text-danger">{error}</div>}
  </div>

FullWidthInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string
}

export default FullWidthInput
