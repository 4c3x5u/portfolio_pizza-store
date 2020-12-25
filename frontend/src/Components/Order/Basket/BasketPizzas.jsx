import React, { useContext } from 'react';
import { arrayEmpty, inchesLookup } from '../util';
import { OrderContext } from '../Context/OrderStore';

const BasketPizzas = () => {
  const [{ pizzas }] = useContext(OrderContext);
  return (
    <div className="Pizzas">
      {pizzas.map((pizza) => (
        <div key={JSON.stringify(pizza)} className="Pizza col-xl-12">
          <h4>
            {inchesLookup(pizza.size)}
            {' '}
            Pizza - (£
            {pizza.price}
            )
          </h4>
          <p>
            {!arrayEmpty(pizza.toppings)
              ? pizza.toppings.map((topping) => {
                if (topping === pizza.toppings[pizza.toppings.length - 1]) {
                  return <span key={topping} className="text-light">{topping}</span>;
                }
                return <span key={topping} className="text-light">{`${topping}, `}</span>;
              }) : (
                <span className="text-light">
                  No Toppings (Tomato Sauce and Cheese Only)
                </span>
              )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BasketPizzas;
