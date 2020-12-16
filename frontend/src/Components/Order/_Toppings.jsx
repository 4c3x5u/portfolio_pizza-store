import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Basket from './Basket/Basket';
import { arrayEmpty } from './Basket/utils';

const Toppings = ({ location }) => {
  const { size } = useParams();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const { availableToppings } = location.state;

  const submitPizza = () => console.log(size);

  const viewTopping = (topping) => (
    <>
      {(!arrayEmpty(selectedToppings) && !selectedToppings.includes(topping)) && (
        <a className="Selected" href={0} onClick={() => setSelectedToppings([...selectedToppings, topping])}>{topping}</a>
      )}
      {((arrayEmpty(selectedToppings) || selectedToppings.includes(topping))
        && selectedToppings.length < 6)
      && (
        <a className="Available" href={0} onClick={() => setSelectedToppings([...selectedToppings, topping])}>{topping}</a>
      )}
      {((arrayEmpty(selectedToppings) || selectedToppings.includes(topping))
        && selectedToppings.length >= 6)
      && (
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

Toppings.propTypes = {
  location: {
    pathname: PropTypes.string.isRequired,
    state: {
      availableToppings: PropTypes.arrayOf({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }.isRequired,
  }.isRequired,
};

export default Toppings;
