import React from 'react';
import PropTypes from 'prop-types';

const HalfWidthInput = ({
  name, field, setField, type, right, placeholder, validator,
}) => (
  <div className={`form-group col-10 col-md-5 offset-1 ${right && 'offset-md-0'}`}>
    <label htmlFor={name} className="control-label">{name}</label>
    <input
      id={name}
      value={field}
      onChange={(e) => setField(e.target.value)}
      type={type}
      className="form-control"
      placeholder={placeholder}
    />
    <span className="text-danger">{validator}</span>
  </div>
);

HalfWidthInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  right: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validator: PropTypes.any,
};

HalfWidthInput.defaultProps = {
  validator: '',
};

export default HalfWidthInput;
