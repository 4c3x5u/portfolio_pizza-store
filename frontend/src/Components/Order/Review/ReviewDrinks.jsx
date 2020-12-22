import React from 'react'
import PropTypes from 'prop-types'
import { sidesOrDrinksTotal } from '../utils'

const ReviewDrinks = ({ drinks, removeDrink }) =>
  <div className="Drinks offset-1 col-10">
    <h3>
      Drinks (£
      {sidesOrDrinksTotal(drinks)}
      )
    </h3>
    {drinks.map(d =>
      <h5 key={d.name}>
        {d.quantity} x {d.name} (£{d.price})
        <button type="button" onClick={() => removeDrink(d)} className="RemoveDrink">
          <i className="RemoveDrink fas fa-minus-circle" />
        </button>
      </h5>
    )}
  </div>

ReviewDrinks.propTypes = {
  drinks: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  removeDrink: PropTypes.func.isRequired
}

export default ReviewDrinks
