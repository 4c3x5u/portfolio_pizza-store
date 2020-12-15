import React from 'react';
import PropTypes from 'prop-types';
import { pizzasEmpty, toppingsEmpty } from './utils';

const Pizzas = ({ pizzas }) => (
  !pizzasEmpty(pizzas) && (
    <div className="Pizzas">
      {pizzas.filter((o) => o.done).map((pizza) => (
        <div className="Pizza col-xl-12">
          <h4>
            {pizza.inches}
            {' '}
            Pizza
            {' '}
            {pizza.free ? <>Free</> : pizza.price}
          </h4>
          <p>
            {(!toppingsEmpty(pizza.toppings)) ? (
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
  )
);

Pizzas.propTypes = {
  pizzas: PropTypes.arrayOf({
    toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
    inches: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    free: PropTypes.bool.isRequired,
    price: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired, // This field will be concatenated with order pizza
  }).isRequired,
};

export default Pizzas;
