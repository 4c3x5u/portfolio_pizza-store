import React, { useContext } from 'react';
import { sidesOrDrinksTotal } from '../util';
import { OrderContext } from '../Context/OrderStore';

const BasketSides = () => {
  const [{ sides }] = useContext(OrderContext);
  return (
    <div className="Sides text-center">
      <h4>
        Sides (£
        {sidesOrDrinksTotal(sides)}
        )
      </h4>
      {sides.map((s) => (
        <p key={s.name} className="Side">
          {s.quantity}
          {' x '}
          {s.name}
          {' (£'}
          {s.price.toFixed(2)}
          )
        </p>
      ))}
    </div>
  );
};

export default BasketSides;
