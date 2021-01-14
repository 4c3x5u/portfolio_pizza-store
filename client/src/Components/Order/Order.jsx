import React, { useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { useAuth } from '../../context/auth';
import { OrderContext } from './Context/OrderStore';

import ChooseCategory from './Choose/Category/ChooseCategory';
import ChoosePizzaSize from './Choose/PizzaSize/ChoosePizzaSize';
import ChoosePizzaToppings from './Choose/PizzaToppings/ChoosePizzaToppings';
import ChooseSides from './Choose/Sides/ChooseSides';
import ChooseDrinks from './Choose/Drinks/ChooseDrinks';
import FinalizeOrder from './Finalize/FinalizeOrder';
import ReviewOrder from './Review/ReviewOrder';
import ThankYou from './ThankYou/ThankYou';
import OrderHistory from './History/OrderHistory';
import NotFound from '../NotFound/NotFound';

import './Order.sass';

const Order = () => {
  const { url } = useRouteMatch();
  const [state, dispatch] = useContext(OrderContext);
  const { authTokens } = useAuth();

  useEffect(() => ((!state.memberId && authTokens && authTokens.user)
    && dispatch({ type: 'SET_MEMBER_ID', payload: authTokens.user })
  ), []);

  return (
    <>
      <Switch>
        <Route exact path={url} component={ChooseCategory} />
        <Route exact path={`${url}/pizza`} component={ChoosePizzaSize} />
        <Route exact path={`${url}/pizza/:size`} component={ChoosePizzaToppings} />
        <Route exact path={`${url}/sides`} component={ChooseSides} />
        <Route exact path={`${url}/drinks`} component={ChooseDrinks} />
        <Route exact path={`${url}/review`} component={ReviewOrder} />
        <Route exact path={`${url}/finalize`} component={FinalizeOrder} />
        <Route exact path={`${url}/thank-you`} component={ThankYou} />
        <Route exact path={`${url}/history`} component={OrderHistory} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Order;
