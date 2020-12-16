import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth';

import { OrderContext } from './Context/OrderStore';
import Categories from './_Categories';
import Pizza from './_Pizza';
import Toppings from './_Toppings';

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
        <Route exact path={url} component={Categories} />
        <Route exact path={`${url}/pizza`} component={Pizza} />
        <Route exact path={`${url}/pizza/:size`} component={Toppings} />
      </Switch>
    </>
  );
};

export default Order;
