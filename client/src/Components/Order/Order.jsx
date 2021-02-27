import React, { useContext, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { useAuth } from '../../context/auth';
import { OrderContext } from './Context/OrderStore';

import SelectCategory from './Select/Category/SelectCategory';
import SelectPizzaSize from './Select/PizzaSize/SelectPizzaSize';
import SelectPizzaToppings from './Select/PizzaToppings/SelectPizzaToppings';
import SelectSides from './Select/Sides/SelectSides';
import SelectDrinks from './Select/Drinks/SelectDrinks';
import FinaliseOrder from './Finalise/FinaliseOrder';
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
        <Route exact path={url} component={SelectCategory} />
        <Route exact path={`${url}/pizza`} component={SelectPizzaSize} />
        <Route exact path={`${url}/pizza/:size`} component={SelectPizzaToppings} />
        <Route exact path={`${url}/sides`} component={SelectSides} />
        <Route exact path={`${url}/drinks`} component={SelectDrinks} />
        <Route exact path={`${url}/review`} component={ReviewOrder} />
        <Route exact path={`${url}/finalise`} component={FinaliseOrder} />
        <Route exact path={`${url}/thank-you`} component={ThankYou} />
        <Route exact path={`${url}/history`} component={OrderHistory} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Order;
