import React from 'react';
import { Link } from 'react-router-dom';
import Basket from './Basket/Basket';

const ChooseCategory = () => (
  // TODO: Create new order in mongodb and return its id.
  // const order = '';
  // const pizzas = ''; //Get all pizzas for order, including amount
  // const drinks = ''; //Get all drinks for order, including amount
  // const sides = ''; //Get all sides for order, including ammount
  <section id="Order">
    <div id="PageContainer" className="container-fluid">
      <div id="PageRow" className="row">

        <Basket />

        <div id="ExceptBasket" className=" col-10 col-xl-8 offset-1">
          <article className="Options">
            <Link to="/pizza/size" className="Pizzas">
              PIZZAS
            </Link>
            <Link to="/sides/choose" className="Pizzas">
              SIDES
            </Link>
            <Link to="/drinks/choose" className="Pizzas">
              DRINKS
            </Link>
          </article>
        </div>

      </div>
    </div>
  </section>
);

export default ChooseCategory;
