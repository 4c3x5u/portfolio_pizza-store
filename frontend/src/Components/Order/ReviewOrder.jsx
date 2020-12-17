import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from './Context/OrderStore';
import { orderTotal, arrayEmpty, inchesLookup } from './utils';

const removePizza = () => {
  // TODO: Implement remove pizza using dispatch
};

const viewPizzas = (pizzas) => (
  !arrayEmpty(pizzas) && (
    pizzas.map((p) => (
      <div className="Pizza col-10 offset-1">
        <h3>
          {inchesLookup(p.size)}
          {' Pizza (£'}
          {p.price}
          )
        </h3>
        <p>
          {!arrayEmpty(p.toppings) ? (
            p.toppings.map((t) => (
              t === p.toppings[p.toppings.length - 1] ? (
                <span>{t}</span>
              ) : (
                <span>
                  {t}
                  {', '}
                </span>
              )
            ))
          ) : (
            <span>No Toppings (Tomato Sauce and Cheese Only)</span>
          )}
        </p>
        <button type="button" onClick={removePizza} className="RemovePizza">
          <i className="RemovePizza fas fa-trash-alt" />
        </button>
      </div>
    ))
  )
);

const ReviewOrder = () => {
  const [{ pizzas, sides, drinks }] = useContext(OrderContext);
  return (
    <section id="ReviewOrder">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <article className="PageHead col-10 offset-1">
            <Link to="/order" className="BackButton">BACK</Link>
            <h2 className="Header">YOUR ORDER</h2>
          </article>

          {viewPizzas(pizzas)}
          {/* TODO: Implement Order Partial */}

          <article className="Done col-10 offset-1">
            <h4 className="Total">
              Total: £
              {orderTotal(pizzas, sides, drinks)}
            </h4>
            <Link to="/order/finalize" className="Confirm">CONFIRM</Link>
          </article>

        </div>
      </div>
    </section>
  );
};

export default ReviewOrder;
