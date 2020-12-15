import React from 'react';
import { Link } from 'react-router-dom';
import Basket from './Basket';

const Order = () => {
  // TODO: Create new order in mongodb and return its id.
  const orderId = '';

  return (
    <section id="Order">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <Basket />

          <div id="ExceptBasket" className=" col-10 col-xl-8 offset-1">
            <article className="Options">
              <Link to="/pizza/size" className="Pizzas" orderId={orderId}>
                PIZZAS
              </Link>
              <Link to="/sides/choose" className="Pizzas" orderId={orderId}>
                SIDES
              </Link>
              <Link to="/drinks/choose" className="Pizzas" orderId={orderId}>
                DRINKS
              </Link>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Order;
