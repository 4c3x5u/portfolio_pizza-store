import React, { useContext } from 'react'
import { sidesOrDrinksTotal } from '../utils'
import { OrderContext } from '../Context/OrderStore'

const Drinks = () => {
  const [{ drinks }] = useContext(OrderContext)
  return (
    <div className="Drinks col-xl-12">
      <h4>
        Drinks (£{sidesOrDrinksTotal(drinks)})
      </h4>
      {drinks.map(d =>
        <p key={d.name}>
          {d.quantity} x {d.name} (£{d.price})
        </p>
      )}
    </div>
  )
}

export default Drinks
