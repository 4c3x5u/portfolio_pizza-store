import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from './Context/OrderStore';
import { orderTotal } from './utils';

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
