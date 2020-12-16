import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { getSides } from '../../api';

import Basket from './Basket/Basket';

const ChooseSides = () => {
  const [availableSides, setAvailableSides] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getSides()
      .then((ss) => {
        setAvailableSides(ss.map((s) => s.name));
      });
  }, []);

  const submitSides = () => setDone(true);

  if (done) {
    return <Redirect to="/order" />;
  }

  return (
    <section id="AddSide">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <Basket />

          <div id="ExceptBasket" className="col-xl-8 offset-xl-1">

            <article className="PageHead col-xl-12">
              <h2 className="Header">ADD SIDES</h2>
            </article>

            <article id="Sides" className="col-xl-12">
              <div className="row">

                {availableSides.map((side) => (
                  <div className="col-4">
                    <a href="ADDSIDE">{side}</a>
                  </div>
                ))}

              </div>
            </article>

            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="Done" onClick={submitSides}>DONE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseSides;
