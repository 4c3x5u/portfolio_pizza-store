import React from 'react';
import PropTypes from 'prop-types';
import { sidesOrDrinksTotal } from '../util';

const HistorySides = ({ sides }) => (
  <div className="Sides">
    <h3>
      Sides (£
      {sidesOrDrinksTotal(sides)}
      )
    </h3>
    {sides.map((side) => (
      <h5 key={side.name}>
        {side.quantity}
        {' '}
        x
        {side.name}
        {' '}
        (£
        {side.price}
        )
      </h5>
    ))}
  </div>
);

HistorySides.propTypes = {
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default HistorySides;
