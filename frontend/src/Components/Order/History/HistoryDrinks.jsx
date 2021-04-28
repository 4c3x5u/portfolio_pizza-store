import React from 'react';
import PropTypes from 'prop-types';
import { sidesOrDrinksTotal } from '../util';

const HistoryDrinks = ({ drinks }) => (
  <div className="Drinks">
    <h3>
      Drinks (£
      {sidesOrDrinksTotal(drinks)}
      )
    </h3>
    {drinks.map((drink) => (
      <h5 key={drink.name}>
        {drink.quantity}
        {' '}
        x
        {drink.name}
        {' '}
        (£
        {drink.price}
        )
      </h5>
    ))}
  </div>
);

HistoryDrinks.propTypes = {
  drinks: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default HistoryDrinks;
