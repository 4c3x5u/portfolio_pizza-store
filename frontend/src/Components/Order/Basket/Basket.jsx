import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { basketIsEmpty } from './utils';

import Pizzas from './_Pizzas';
import Sides from './_Sides';
import Drinks from './_Drinks';

const Basket = ({
  orderId, pizzas, drinks, sides,
}) => (
  !basketIsEmpty(pizzas, drinks, sides) ? (
    <>
      <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
        <div className="Inner">
          <Pizzas pizzas={pizzas} />
          <Sides sides={sides} />
          <Drinks drinks={drinks} />
        </div>

        <Link to="/order/review" className="OrderButton" orderId={orderId}>Edit/Finalize</Link>

        <h4 className="Total">Total: £@Model.GetTotal().ToString()</h4>

      </article>
    </>
  ) : (
    <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
      <h4>No items in the basket...</h4>
    </article>
  )
);

Basket.propTypes = {
  orderId: PropTypes.number.isRequired,
  pizzas: PropTypes.arrayOf({
    toppings: PropTypes.arrayOf(PropTypes.string).isRequired,
    inches: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    free: PropTypes.bool.isRequired,
    price: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  drinks: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Basket;
