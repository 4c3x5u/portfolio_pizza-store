import React, { useContext, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useAuth } from '../../context/auth'

import { OrderContext } from './Context/OrderStore'
import ChooseCategory from './Choose/ChooseCategory'
import ChoosePizzaSize from './Choose/ChoosePizzaSize'
import ChoosePizzaToppings from './Choose/ChoosePizzaToppings'
import ChooseSides from './Choose/ChooseSides'
import ChooseDrinks from './Choose/ChooseDrinks'
import Finalize from './Review/Finalize'
import ReviewOrder from './Review/ReviewOrder'
import ThankYou from './Review/ThankYou'

const Order = () => {
  const { url } = useRouteMatch()
  const [state, dispatch] = useContext(OrderContext)
  const { authTokens } = useAuth()

  useEffect(() => {
    !state.memberId && authTokens && authTokens.user
      ? dispatch({ type: 'SET_MEMBER_ID', payload: authTokens.user })
      : dispatch({ type: 'SET_MEMBER_ID', payload: 'guest' })
  }, [])

  return (
    <>
      <Switch>
        <Route exact path={url} component={ChooseCategory} />
        <Route exact path={`${url}/pizza`} component={ChoosePizzaSize} />
        <Route exact path={`${url}/pizza/:size`} component={ChoosePizzaToppings} />
        <Route exact path={`${url}/sides`} component={ChooseSides} />
        <Route exact path={`${url}/drinks`} component={ChooseDrinks} />
        <Route exact path={`${url}/review`} component={ReviewOrder} />
        <Route exact path={`${url}/finalize`} component={Finalize} />
        <Route exact path={`${url}/thank-you/:total`} component={ThankYou} />
      </Switch>
    </>
  )
}

export default Order
