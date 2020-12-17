/* eslint-disable quote-props */
import React from 'react';
import PropTypes from 'prop-types';
import { arrayEmpty } from './utils';

const Pizzas = ({ pizzas }) => {
  const inchesLookup = (size) => ({
    'small': 10,
    'medium': 14,
    'large': 18,
  }[size]);

  return (
    <div className="Pizzas">
      {pizzas.map((pizza) => (
        <div className="Pizza col-xl-12">
          <h4>
            {inchesLookup(pizza.size)}
            &quot; Pizza - (£
            {pizza.price}
            )
          </h4>
          <p>
            {(!arrayEmpty(pizza.toppings)) ? (
              pizza.toppings.map((topping) => (
                topping !== pizza.toppings[pizza.toppings.length - 1] ? (
                  <span className="text-light">
                    {topping}
                    ,
                    {' '}
                  </span>
                ) : (
                  <span className="text-light">{topping}</span>
                )
              ))
            ) : (
              <span className="text-light">No Toppings (Tomato Sauce and Cheese Only)</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

Pizzas.propTypes = {
  pizzas: PropTypes.arrayOf({
    toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
    inches: PropTypes.number.isRequired,
    price: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Pizzas;
