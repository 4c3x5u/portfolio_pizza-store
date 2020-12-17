import React from 'react';
import PropTypes from 'prop-types';

const Drinks = ({ drinks }) => {
  const drinksTotal = () => drinks.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2);
  return (
    <div className="Drinks col-xl-12">
      <h4>
        Drinks (£
        {' '}
        {drinksTotal()}
        )
      </h4>
      {drinks.map((d) => (
        <p>
          {d.quantity}
          {' x '}
          {d.name}
          {' (£'}
          {d.price}
          )
        </p>
      ))}
    </div>
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
