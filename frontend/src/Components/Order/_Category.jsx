import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => (
  <section id="Order">
    <div id="PageContainer" className="container-fluid">
      <div id="PageRow" className="row">
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

export default Category;
