import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Basket from './Basket/Basket';
import { arrayEmpty } from './Basket/utils';
import { getToppings } from '../../api';

const Toppings = () => {
  const { size } = useParams();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [availableToppings, setAvailableToppings] = useState([]);

  useEffect(() => {
    getToppings()
      .then((ts) => {
        setAvailableToppings(ts.map((t) => t.name));
      });
  }, []);

  const submitPizza = () => size;

  const viewTopping = (topping) => (
    <>
      {(!arrayEmpty(selectedToppings) && selectedToppings.includes(topping)) && (
        <button type="button" className="Selected" onClick={() => setSelectedToppings([...selectedToppings, topping])}>{topping}</button>
      )}
      {((arrayEmpty(selectedToppings) || !selectedToppings.includes(topping))
        && selectedToppings.length < 6)
        && (
          <button type="button" className="Available" onClick={() => setSelectedToppings([...selectedToppings, topping])}>{topping}</button>
        )}
      {((arrayEmpty(selectedToppings) && selectedToppings.length >= 6)) && (
        <a href="#MaxToppingsModal" data-toggle="modal">{topping}</a>
      )}
    </>
  );

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
                  <div className="col-md-3 col-6">
                    {viewTopping(t)}
                  </div>
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
