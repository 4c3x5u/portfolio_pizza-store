import React from 'react'
import PropTypes from 'prop-types'
import { sidesOrDrinksTotal } from '../util'

const ReviewSides = ({ sides, removeSide }) =>
  <div className="Sides offset-1 col-10">
    <h3>
      Sides (£
      {sidesOrDrinksTotal(sides)}
      )
    </h3>
    {sides.map(s =>
      <h5 key={s.name}>
        {s.quantity} x {s.name} (£{s.price})
        <button type="button" onClick={() => removeSide(s)} className="RemoveSide">
          <i className="RemoveSide fas fa-minus-circle" />
        </button>
      </h5>
    )}
  </div>

ReviewSides.propTypes = {
  sides: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  removeSide: PropTypes.func.isRequired
}

export default ReviewSides
