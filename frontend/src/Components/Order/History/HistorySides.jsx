import React from 'react'
import { sidesOrDrinksTotal } from '../utils'
import PropTypes from 'prop-types'

const HistorySides = ({ allSides, orderSides }) => {
  const sides =
    orderSides.map(sideA => {
      const side = allSides.find(sideB => sideA.name === sideB.name)
      return { ...side, quantity: sideA.quantity }
    })

  return (
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
  )
}

HistorySides.propTypes = {
  allSides: PropTypes.array.isRequired,
  orderSides: PropTypes.array.isRequired
}

export default HistorySides
