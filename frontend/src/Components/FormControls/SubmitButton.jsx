import React from 'react'
import PropTypes from 'prop-types'

const SubmitButton = ({ handleSubmit, disabled }) =>
  <div className="Done form-group col-10 offset-1">
    <input
      type="submit"
      value="Sign In"
      className="Confirm btn btn-default"
      onClick={handleSubmit}
      disabled={disabled}
    />
  </div>

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

SubmitButton.defaultProps = {
  disabled: false
}

export default SubmitButton
