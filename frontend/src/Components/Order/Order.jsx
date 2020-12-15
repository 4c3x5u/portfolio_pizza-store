import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useAuth } from '../../context/auth';

import { OrderContext } from './Context/OrderStore';
import Categories from './_Categories';
import Pizza from './_Pizza';
import Toppings from './_Toppings';

const Order = () => {
  const { url } = useRouteMatch();
  const [, dispatch] = useContext(OrderContext);
  const { authTokens } = useAuth();

  useEffect(() => (
    (authTokens && authTokens.user) ? (
      dispatch({ type: 'SET_MEMBER_ID', payload: authTokens.user })
    ) : (
      dispatch({ type: 'SET_MEMBER_ID', payload: 'guest' })
    )
  ), []);

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
