import React from 'react';
import { Link } from 'react-router-dom';

import Basket from '../../Basket/Basket';

import './SelectPizzaSize.sass';

const SelectPizzaSize = () => (
  <section id="PizzaSize">
    <div id="PageContainer" className="container-fluid">
      <div id="PageRow" className="row">

        <Basket />

        <div id="ExceptBasket" className="col-xl-8 offset-xl-1">
          <article className="PageHead col-xl-12">
            <Link className="BackButton" to="/order">BACK</Link>
            <h2 className="Header">SELECT PIZZA SIZE</h2>
          </article>

          <div className="col-xl-12 px-0">
            <article className="Options row">
              <div className="col-4">
                <Link className="Small" to="/order/pizza/small">
                  10&quot;
                </Link>
              </div>
              <div className="col-4">
                <Link className="Medium" to="/order/pizza/medium">
                  14&quot;
                </Link>
              </div>
              <div className="col-4">
                <Link className="Large" to="/order/pizza/large">
                  18&quot;
                </Link>
              </div>
            </article>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default SelectPizzaSize;
