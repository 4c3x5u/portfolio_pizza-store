import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { getOrderHistory } from '../../api'

const OrderHistory = () => {
  const { memberId } = useLocation().state
  const [, setOrderHistory] = useState([])

  useEffect(
    () =>
      getOrderHistory(memberId)
        .then(history => setOrderHistory(history)),
    []
  )

  return (
    <div/>
  )
}

export default OrderHistory
