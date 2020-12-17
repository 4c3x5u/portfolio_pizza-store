import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth';

import { OrderContext } from './Context/OrderStore';
import ChooseCategory from './_ChooseCategory';
import ChoosePizzaSize from './_ChoosePizzaSize';
import ChoosePizzaToppings from './_ChoosePizzaToppings';
import ChooseSides from './_ChooseSides';
import ChooseDrinks from './_ChooseDrinks';
import FinalizeOrder from './_FinalizeOrder';
import ReviewOrder from './ReviewOrder';

const Order = () => {
  const { url } = useRouteMatch();
  const [state, dispatch] = useContext(OrderContext);
  const { authTokens } = useAuth();

  useEffect(() => {
    if (!state.id) {
      dispatch({ type: 'SET_ORDER_ID', payload: uuidv4() });
    }
    if (!state.memberId) {
      if (authTokens && authTokens.user) {
        dispatch({ type: 'SET_MEMBER_ID', payload: authTokens.user });
      } else {
        dispatch({ type: 'SET_MEMBER_ID', payload: 'guest' });
      }
    }
  }, []);

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
      </Switch>
    </>
  );
};

export default Order;
