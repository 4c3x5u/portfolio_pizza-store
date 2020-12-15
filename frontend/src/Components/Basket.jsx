import React from 'react';
import { Link } from 'react-router-dom';

const Basket = () => {
  const order = {
    pizzas: [],
    drinks: [],
    sides: [],
  };

  const pizzasEmpty = () => !order.pizzas.some((p) => p.Done);
  const drinksEmpty = () => order.drinks !== undefined && order.drinks.length === 0;
  const sidesEmpty = () => order.sides !== undefined && order.sides.length === 0;
  const basketIsEmpty = () => (pizzasEmpty && drinksEmpty() && sidesEmpty());
  const toppingsEmpty = (pizza) => pizza.toppings !== undefined && pizza.toppings.length === 0;

  const pizzas = () => (
    !pizzasEmpty() && (
      <div className="Pizzas">
        {order.pizzas.filter((o) => o.Done).map((p) => (
          <div className="Pizza col-xl-12">
            {(p.Free) ? (
              <h4> @p.Inches.ToString() Pizza (Free)</h4>
            ) : (
              <h4> @p.Inches.ToString() Pizza (@p.GetPrice())</h4>
            )}
            <p>
              {(!toppingsEmpty(p)) ? (
                p.toppings.map((t) => (
                  (t !== p.toppings.last()) ? (
                    <span className="text-light">@t.Name, </span>
                  ) : (
                    <span className="text-light">@t.Name</span>
                  )
                ))
              ) : (
                <span className="text-light">No Toppings (Tomato Sauce and Cheese Only)</span>
              )}
            </p>
          </div>
        ))}
      </div>
    )
  );

  return (
    !basketIsEmpty ? (
      <>
        <article id="Basket" className="col-12 col-xl-2 h-100 d-flex justify-content-center align-items-center">
          <div className="Inner">

            {pizzas()}

            {(!sidesEmpty) && (
              <div className="Sides col-xl-12">
                <h4>
                  Sides
                  {' '}
                  {order.sideTotal}
                </h4>
                {order.sides.map((s) => (
                  <p className="Side">
                    {s.amout}
                    {' '}
                    x
                    {s.name}
                    {' '}
                    (£@
                    {s.side.price}
                    )
                  </p>
                ))}
              </div>
            )}

            {drinksEmpty() && (
              <div className="Drinks col-xl-12">
                <h4>
                  Drinks (£
                  {order.drinkTotal()}
                </h4>
                {order.drinks.map((d) => (
                  <p>
                    {d.amount}
                    {' '}
                    x
                    {' '}
                    {d.name}
                    {' '}
                    (£
                    {d.drink.price}
                    )
                  </p>
                ))}
              </div>
            )}

          </div>

          <Link to="/order/review" className="OrderButton" orderId={order.id}>Edit/Finalize</Link>

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
