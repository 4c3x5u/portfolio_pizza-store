import React from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const ThankYou = () => {
  const { total } = useParams()
  return (
    <section id="ThankYou">
      <div id="PageContainer" className="container-fluid">
        <div id="PageRow" className="row">

          <article className="PageHead col-10 offset-1">
            <h2 className="Header">THANK YOU FOR CHOOSING BLAZIN!</h2>
            <h4>Your order will be with you in 40 minutes!</h4>
          </article>

          {/* POINTS PARTIAL */}
          {/* RECEIPTS PARTIAL */}

          <article className="Done col-10 offset-1">
            <h4 className="Total">Total Paid: {total}</h4>
            <Link className="Confirm" to="/">HOME</Link>
          </article>

        </div>
      </div>
    </section>
  )
}

ThankYou.propTypes = {
  location: {
    state: {
      total: PropTypes.number.isRequired
    }.isRequired
  }.isRequired
}

export default ThankYou
