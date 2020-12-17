import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import Basket from './Basket/Basket';
import { arrayEmpty } from './Basket/utils';
import { getToppings } from '../../api';
import { OrderContext } from './Context/OrderStore';

const ChoosePizzaToppings = () => {
  const { size } = useParams();
  const [availableToppings, setAvailableToppings] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [, dispatch] = useContext(OrderContext);

  useEffect(() => {
    getToppings()
      .then((ts) => {
        setAvailableToppings(ts.map((t) => t.name));
      });
  }, []);

  const pizzaPriceLookup = {
    // eslint-disable-next-line quote-props
    'small': 8.99, 'medium': 10.99, 'large': 12.99,
  };

  const submitPizza = () => {
    const price = ((toppings.length) * 0.35) + pizzaPriceLookup[size];
    dispatch({ type: 'ADD_PIZZA', payload: { toppings, size, price } });
    setSubmitted(true);
  };

  const toggleToppingSelected = (topping) => (
    toppings.includes(topping) ? (
      setToppings(toppings.filter((t) => t !== topping))
    ) : (
      setToppings([...toppings, topping])
    )
  );

  const viewTopping = (topping) => (
    <>
      {(!arrayEmpty(toppings) && toppings.includes(topping)) && (
        <button type="button" className="Selected" onClick={() => toggleToppingSelected(topping)}>{topping}</button>
      )}
      {((arrayEmpty(toppings) || !toppings.includes(topping))
        && toppings.length < 6)
        && (
          <button type="button" className="Available" onClick={() => toggleToppingSelected(topping)}>{topping}</button>
        )}
      {!toppings.includes(topping) && toppings.length >= 6 && (
        <button type="button" onClick={() => console.log('TODO: #MaxToppingsModal')} data-toggle="modal">{topping}</button>
      )}
    </>
  );

  if (submitted) {
    return <Redirect to="/order" />;
  }

  return (
    <section id="PizzaTopping">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <Basket />

          <div id="ExceptBasket" className="col-xl-8 offset-xl-1">
            <article className="PageHead col-xl-12">
              <Link className="BackButton" to="/order/pizza">BACK</Link>
              <h2 className="Header">SELECT TOPPINGS</h2>
            </article>

            <div className="col-xl-12">
              <article id="Toppings" className="row">
                {!arrayEmpty(availableToppings) && availableToppings.map((t) => (
                  <div key={t} className="col-md-3 col-6">
                    {viewTopping(t)}
                  </div>
                ))}

                {/* TODO: IMPLEMENT MODAL */}

              </article>

            </div>

            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="Done" onClick={submitPizza}>DONE</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChoosePizzaToppings;
