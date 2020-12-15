import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useAuth } from '../../context/auth';

import { OrderContext } from './OrderContext/OrderStore';
import Category from './_Category';

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
    <Switch>
      <Route exact path={`${url}/category`} component={Category} />
    </Switch>
  );
};

export default Order;
