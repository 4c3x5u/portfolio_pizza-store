import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { orderEmpty, arrayEmpty, orderTotal } from '../util';
import { OrderContext } from '../Context/OrderStore';

import BasketPizzas from './BasketPizzas';
import BasketSides from './BasketSides';
import BasketDrinks from './BasketDrinks';

import './Basket.sass';

const Basket = () => {
  const [{ pizzas, sides, drinks }] = useContext(OrderContext);

  return (
    !orderEmpty(pizzas, sides, drinks)
      ? (
        <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
          <div className="Inner">
            {!arrayEmpty(pizzas) && <BasketPizzas />}
            {!arrayEmpty(sides) && <BasketSides />}
            {!arrayEmpty(drinks) && <BasketDrinks />}
          </div>

          <h4 className="Total mb-2">
            Total: £
            {orderTotal(pizzas, sides, drinks)}
          </h4>

          <Link to="/order/review" className="OrderButton">REVIEW</Link>
        </article>
      )
      : (
        <article
          id="Basket"
          className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center"
        >
          <h4>No items in the basket...</h4>
        </article>
      )

  );
};

export default Basket;
