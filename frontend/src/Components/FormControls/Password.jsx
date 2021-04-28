import React from 'react';
import PropTypes from 'prop-types';

const Password = ({ password, setPassword, validator }) => (
  <div className="form-group col-10 offset-1">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="password" className="control-label">
      Password
    </label>
    <input
      id="password"
      type="password"
      name="password"
      className="form-control mb-2"
      value={password}
      onChange={(e) => (setPassword(e.target.value))}
    />
    <span className="text-danger h5">{validator}</span>
  </div>
);

Password.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validator: PropTypes.any,
};

Password.defaultProps = {
  validator: '',
};

export default Password;
