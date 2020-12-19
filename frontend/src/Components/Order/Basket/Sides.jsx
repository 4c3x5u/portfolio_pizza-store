import React, { useContext } from 'react'
import { sidesOrDrinksTotal } from '../utils'
import { OrderContext } from '../Context/OrderStore'

const Sides = () => {
  const [{ sides }] = useContext(OrderContext)
  return (
    <div className="Sides col-xl-12">
      <h4>Sides (£{sidesOrDrinksTotal(sides)})</h4>
      {sides.map(s =>
        <p key={s.name} className="Side">
          {s.quantity} x {s.name} (£{s.price})
        </p>
      )}
    </div>
  )
}

export default Sides
