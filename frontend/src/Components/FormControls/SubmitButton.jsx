import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, handleSubmit, disabled }) => (
  <div className="Done form-group col-10 offset-1">
    <input
      type="submit"
      value={text}
      className={`Confirm btn ${!disabled && 'active'}`}
      onClick={handleSubmit}
      disabled={disabled}
    />
  </div>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
