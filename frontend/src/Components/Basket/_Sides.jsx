import React from 'react';
import PropTypes from 'prop-types';
import { arrayEmpty } from './utils';

const Sides = ({ sides }) => {
  const sidesTotal = () => sides.reduce((a, b) => a + b.price, 0);
  return (
    !arrayEmpty(sides) && (
      <div className="Sides col-xl-12">
        <h4>
          Sides (£
          {' '}
          {sidesTotal()}
          )
        </h4>
        {sides.map((s) => (
          <p className="Side">
            {/* Figure out a way to handle this. */}
            {s.amount}
            {' '}
            x
            {s.name}
            {' '}
            (£
            {s.price}
            )
          </p>
        ))}
      </div>
    )
  );
};

Sides.propTypes = {
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Sides;
