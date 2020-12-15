import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ email, setEmail }) => (
  <div className="form-group col-10 offset-1">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="email" className="control-label">Email</label>
    <input
      id="email"
      type="email"
      name="email"
      className="form-control"
      value={email}
      onChange={(e) => (setEmail(e.target.value))}
    />
    <span
      className="field-validation-valid text-danger"
      data-valmsg-for="email"
      data-valmsg-replace="true"
    />
  </div>
);

Email.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default Email;
