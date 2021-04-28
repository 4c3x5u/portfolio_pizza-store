import React from 'react';
import PropTypes from 'prop-types';
import { arrayEmpty, inchesLookup } from '../util';

const ReviewPizzas = ({ pizzas, removePizza }) => pizzas.map((p) => (
  <div
    key={pizzas.findIndex((pizza) => JSON.stringify(pizza) === JSON.stringify(p))}
    className="Pizza col-10 offset-1"
  >
    <h3>
      {inchesLookup(p.size)}
      {' '}
      Pizza (£
      {p.price.toFixed(2)}
      )
    </h3>
    <p>
      {!arrayEmpty(p.toppings)
        ? p.toppings.map((t) => (
          t === p.toppings[p.toppings.length - 1]
            ? <span>{t}</span>
            : (
              <span>
                {t}
                ,
                {' '}
              </span>
            )
        )) : <span>No Toppings (Tomato Sauce and Cheese Only)</span>}
    </p>
    <button type="button" onClick={() => removePizza(p)} className="RemovePizza">
      <i className="RemovePizza fas fa-trash-alt" />
    </button>
  </div>
));

ReviewPizzas.propTypes = {
  pizzas: PropTypes.arrayOf({
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ReviewPizzas;
