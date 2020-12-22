import React, { useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { OrderContext } from '../Context/OrderStore'
import { orderTotal, orderEmpty } from '../utils'

import Receipt from './Receipt'

const ThankYou = () => {
  const [{ pizzas, sides, drinks }] = useContext(OrderContext)
  const total =
    orderEmpty(pizzas, sides, drinks)
      ? orderTotal(pizzas, sides, drinks)
      : 0

  if (orderEmpty(pizzas, sides, drinks)) {
    return <Redirect to="/order" />
  }

  return (
    <section id="ThankYou">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <article className="PageHead col-10 offset-1">
            <h2 className="Header">THANK YOU FOR CHOOSING BLAZIN!</h2>
            <h4>Your order will be with you in 40 minutes!</h4>
          </article>

          <Receipt />

          <article className="Done col-10 offset-1">
            <h4 className="Total">Total Paid: £{total}</h4>
            <Link className="Confirm" to="/">HOME</Link>
          </article>

        </div>
      </div>
    </section>
  )
}

export default ThankYou
