import React from 'react';
import PropTypes from 'prop-types';

const FullWidthInput = ({
  name, field, setField, type, placeholder, validator,
}) => (
  <div className="form-group col-10 offset-1">
    <label htmlFor={name} className="control-label">{name}</label>
    <input
      id={name}
      value={field}
      onChange={(e) => setField(e.target.value)}
      type={type}
      className="form-control mb-1"
      placeholder={placeholder}
    />
    <span className="text-danger">{validator}</span>
  </div>
);

FullWidthInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validator: PropTypes.any,
};

FullWidthInput.defaultProps = {
  validator: '',
};

export default FullWidthInput;
