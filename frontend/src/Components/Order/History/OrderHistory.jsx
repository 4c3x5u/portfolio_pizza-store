import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getOrderHistory, getSides, getDrinks } from '../../../api'
import { arrayEmpty, inchesLookup, orderTotal } from '../utils'

import HistorySides from './HistorySides'
import HistoryDrinks from './HistoryDrinks'

const OrderHistory = () => {
  const { memberId } = useLocation().state
  const [orderHistory, setOrderHistory] = useState([])
  const [allSides, setAllSides] = useState([])
  const [allDrinks, setAllDrinks] = useState([])

  useEffect(
    () => {
      getOrderHistory(memberId)
        .then(setOrderHistory)
      getSides()
        .then(setAllSides)
      getDrinks()
        .then(setAllDrinks)
    },
    []
  )

  const getOrderDrinks = drinks =>
    !arrayEmpty(drinks) && !arrayEmpty(allDrinks)
      ? drinks.map(drinkA => {
          const drinkB = allDrinks.find(drink => drinkA.name === drink.name)
          return {
            name: drinkA.name,
            quantity: drinkA.quantity,
            price: drinkB.price
          }
        })
      : []

  const getOrderSides = sides =>
    !arrayEmpty(sides) && !arrayEmpty(allSides)
      ? sides.map(sideA => {
          const sideB = allSides.find(sideB => sideA.name === sideB.name)
          return {
            name: sideA.name,
            quantity: sideA.quantity,
            price: sideB.price
          }
        })
      : []

  return (
    <section id="ReviewOrder">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          {console.log(allDrinks, allSides)}

          <article className="PageHead col-10 offset-1">
            <Link to="/order" className="BackButton">BACK</Link>
            <h2 className="Header">ORDER HISTORY</h2>
          </article>

          {!arrayEmpty(orderHistory) && orderHistory.map(order =>
            <div key className="Pizza col-10 offset-1 pt-5">

              {!arrayEmpty(order.pizzas) && order.pizzas.map(p =>
                <>
                  <h3>
                    {inchesLookup(p.size)} Pizza (£{p.price})
                  </h3>
                  <p>
                    {!arrayEmpty(p.toppings)
                      ? p.toppings.map((t) =>
                          t === p.toppings[p.toppings.length - 1]
                            ? <span>{t}</span>
                            : <span>{t}, </span>)
                      : <span>No Toppings (Tomato Sauce and Cheese Only)</span>}
                  </p>
                </>
              )}

              {!arrayEmpty(order.sides) &&
                <HistorySides sides={getOrderSides(order.sides)} />}

              {!arrayEmpty(order.drinks) &&
                <HistoryDrinks drinks={getOrderDrinks(order.drinks)} />}

              <h4 className="Total mt-0 pt-0">
                Total: £
                {orderTotal(
                  order.pizzas,
                  getOrderSides(order.sides),
                  getOrderDrinks(order.drinks))}
              </h4>

            </div>
          )}

        </div>
      </div>
    </section>)
}

export default OrderHistory
