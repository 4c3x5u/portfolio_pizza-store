import React from 'react';
import PropTypes from 'prop-types';
import { arrayEmpty } from './utils';

const Drinks = ({ drinks }) => {
  const drinksTotal = () => drinks.reduce((a, b) => a + b.price, 0);
  return (
    arrayEmpty(drinks) && (
      <div className="Drinks col-xl-12">
        <h4>
          Drinks (£
          {' '}
          {drinksTotal()}
          )
        </h4>
        {drinks.map((d) => (
          <p>
            {d.amount}
            {' '}
            x
            {' '}
            {d.name}
            {' '}
            (£
            {d.drink.price}
            )
          </p>
        ))}
      </div>
    )
  );
};

Drinks.propTypes = {
  drinks: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Drinks;
