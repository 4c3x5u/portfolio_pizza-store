import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ email, setEmail, validator }) => (
  <div className="form-group col-10 offset-1">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="email" className="control-label">Email</label>
    <input
      id="email"
      type="email"
      name="email"
      className="form-control mb-1"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <span className="text-danger">{validator}</span>
  </div>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validator: PropTypes.any,
};

Email.defaultProps = {
  validator: '',
};

export default Email;
