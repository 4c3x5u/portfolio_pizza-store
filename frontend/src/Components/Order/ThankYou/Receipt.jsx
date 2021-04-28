import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../Context/OrderStore';
import {
  arrayEmpty,
  sidesOrDrinksTotal,
  capitalizeFirstLetter,
} from '../util';

const Receipt = () => {
  const [state, dispatch] = useContext(OrderContext);

  useEffect(() => (
    () => dispatch({ type: 'RESET_ORDER_STATE' })
  ), []);

  return (
    <>
      {!arrayEmpty(state.pizzas)
        && state.pizzas.map((pizza) => (
          <div key={JSON.stringify(pizza)} className="Pizza col-10 offset-1">
            <h3>
              {capitalizeFirstLetter(pizza.size)}
              {' '}
              Pizza (£
              {pizza.price}
              )
            </h3>
            <p>
              {!arrayEmpty(pizza.toppings)
                ? pizza.toppings.map((topping) => (
                  topping === pizza.toppings[pizza.toppings.length - 1]
                    ? <span key={topping}>{topping}</span>
                    : (
                      <span key={topping}>
                        {topping}
                        ,
                        {' '}
                      </span>
                    )))
                : <span>No Toppings (Tomato Sauce and Cheese Only)</span>}
            </p>
          </div>
        ))}

      {!arrayEmpty(state.sides)
        && (
        <div className="Sides col-10 offset-1">
          <h3>
            Sides (£
            {sidesOrDrinksTotal(state.sides)}
            )
          </h3>
          {state.sides.map((side) => (
            <h5 key={side.name}>
              {side.quantity}
              {' '}
              x
              {' '}
              {side.name}
              {' '}
              (£
              {side.price}
              )
            </h5>
          ))}
        </div>
        )}

      {!arrayEmpty(state.drinks)
        && (
        <div className="Drinks col-10 offset-1">
          <h3>
            Drinks (£
            {sidesOrDrinksTotal(state.drinks)}
            )
          </h3>
          {state.drinks.map((drink) => (
            <h5 key={drink.name}>
              {drink.quantity}
              {' '}
              x
              {' '}
              {drink.name}
              {' '}
              (£
              {drink.price}
              )
            </h5>
          ))}
        </div>
        )}

      {state.address.firstLine && state.address.postcode
        && (
        <div className="Address col-10 offset-1">
          <h3>Delivery Address</h3>
          <h5>
            {state.address.firstLine}
            ,
            {' '}
            {state.address.postcode}
          </h5>
        </div>
        )}
    </>
  );
};

export default Receipt;
