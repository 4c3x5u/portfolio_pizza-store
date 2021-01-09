import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { OrderContext } from '../../Context/OrderStore';
import { arrayEmpty } from '../../util';
import { getDrinks } from '../../../../api';
import Basket from '../../Basket/Basket';
import './ChooseDrinks.sass';

const ChooseDrinks = () => {
  const [availableDrinks, setAvailableDrinks] = useState([]);
  const [done, setDone] = useState(false);
  const [state, dispatch] = useContext(OrderContext);

  useEffect(() => {
    getDrinks()
      .then((res) => (
        res.status === 200
          && setAvailableDrinks(res.data)
        // TODO: Toastr for error
      ));
  }, []);

  const addDrink = (drink) => (arrayEmpty(state.drinks.filter((s) => s.name === drink.name))
    ? dispatch({ type: 'ADD_NEW_DRINK', payload: drink })
    : dispatch({ type: 'INCREASE_DRINK_QUANTITY', payload: drink.name }));

  if (done) { return <Redirect to="/order" />; }

  return (
    <section id="AddDrink">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <Basket />

          <div id="ExceptBasket" className="col-xl-8 offset-xl-1">
            <article className="PageHead col-xl-12">
              <h2 className="Header">ADD DRINKS</h2>
            </article>

            <article id="Drinks" className="col-xl-12">
              <div className="row">
                {!arrayEmpty(availableDrinks) && availableDrinks.map((drink) => (
                  <div key={drink.name} className="col-4">
                    <button
                      onClick={() => addDrink(drink)}
                      type="button"
                    >
                      {drink.name}
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <div className="col-12 d-flex justify-content-center">
              <button
                onClick={() => setDone(true)}
                className="Done"
                type="button"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseDrinks;
