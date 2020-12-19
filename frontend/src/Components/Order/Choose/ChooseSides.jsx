import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { OrderContext } from '../Context/OrderStore'
import { arrayEmpty } from '../utils'
import { getSides } from '../../../api'

import Basket from '../Basket/Basket'

const ChooseSides = () => {
  const [availableSides, setAvailableSides] = useState([])
  const [done, setDone] = useState(false)
  const [state, dispatch] = useContext(OrderContext)

  useEffect(
    () =>
      getSides().then(serverSides =>
        setAvailableSides(serverSides.map(s => ({
          name: s.name,
          price: s.price,
          quantity: 1
        })))
      ),
    [])

  const addSide = (side) =>
    arrayEmpty(state.sides.filter((s) => s.name === side.name))
      ? dispatch({ type: 'ADD_NEW_SIDE', payload: side })
      : dispatch({ type: 'INCREASE_SIDE_QUANTITY', payload: side.name })

  if (done) {
    return <Redirect to="/order" />
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
                {!arrayEmpty(availableSides) && availableSides.map(side =>
                  <div key={side.name} className="col-4">
                    <button
                      onClick={() => addSide(side)}
                      type="button"
                    >
                      {side.name}
                    </button>
                  </div>
                )}
              </div>
            </article>

            <div className="col-12 d-flex justify-content-center">
              <button
                onClick={() => setDone(true)}
                className="Done"
                type="submit"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChooseSides
