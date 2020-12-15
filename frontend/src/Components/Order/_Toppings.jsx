import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Basket from './Basket/Basket';

const Toppings = () => {
  const { size } = useParams();
  console.log(size);
  const allToppings = [];
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toppingView = (topping) => {
    if (selectedToppings.includes(topping)) {
      <a className="Selected" href={setSelectedToppings([...selectedToppings, topping])}>{topping.Name}</a>;
    } else if (selectedToppings.length < 6) {
      <a className="Available" href={setSelectedToppings([...selectedToppings, topping])}>{topping.Name}</a>;
    } else {
      <a href="#MaxToppingsModal" data-toggle="modal">{topping.Name}</a>;
    }
  };

  const submitPizza = () => console.log(size);

  return (
    <section id="PizzaTopping">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <Basket />

          <div id="ExceptBasket" className="col-xl-8 offset-xl-1">
            <article className="PageHead col-xl-12">
              <a className="BackButton" to="/order/pizza">BACK</a>
              <h2 className="Header">SELECT TOPPINGS</h2>
            </article>

            <div className="col-xl-12">
              <article id="Toppings" className="row">

                {allToppings.map((t) => (
                  <div className="col-md-3 col-6">{toppingView(t)}</div>
                ))}

                {/* TODO: IMPLEMENT MODAL */}

              </article>

            </div>

            <div className="col-12 d-flex justify-content-center">
              <a className="Done" href={submitPizza}>DONE</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Toppings;
