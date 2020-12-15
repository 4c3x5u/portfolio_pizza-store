import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { basketIsEmpty } from './utils';
import { OrderContext } from '../Context/OrderStore';

import Pizzas from './_Pizzas';
import Sides from './_Sides';
import Drinks from './_Drinks';

const Basket = () => {
  const [{ pizzas, drinks, sides }] = useContext(OrderContext);
  return (
    !basketIsEmpty(pizzas, drinks, sides) ? (
      <>
        <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
          <div className="Inner">
            <Pizzas pizzas={pizzas} />
            <Sides sides={sides} />
            <Drinks drinks={drinks} />
          </div>

          <Link to="/order/review" className="OrderButton">Edit/Finalize</Link>

          <h4 className="Total">Total: £@Model.GetTotal().ToString()</h4>

        </article>
      </>
    ) : (
      <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
        <h4>No items in the basket...</h4>
      </article>
    )
  );
};

export default Basket;
