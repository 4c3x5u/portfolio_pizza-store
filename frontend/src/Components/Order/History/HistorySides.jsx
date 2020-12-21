import React from 'react'
import { sidesOrDrinksTotal } from '../utils'
import PropTypes from 'prop-types'

const HistorySides = ({ sides }) =>
  <div className="Sides col-6">
    <h3>
      Sides (£{sidesOrDrinksTotal(sides)})
    </h3>
    {sides.map(side =>
        <h5 key={side.name}>
          {side.quantity} x {side.name} (£{side.price})
        </h5>
    )}
  </div>

HistorySides.propTypes = {
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
}

export default HistorySides
