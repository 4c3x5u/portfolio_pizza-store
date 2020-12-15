import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useAuth } from '../../context/auth';

import { OrderContext } from './OrderContext/OrderStore';
import ChooseCategory from './_ChooseCategory';

const Order = () => {
  const { url } = useRouteMatch();
  const [, dispatch] = useContext(OrderContext);
  const { authTokens } = useAuth();

  useEffect(() => (
    (authTokens && authTokens.user) && (
      dispatch({ type: 'SET_MEMBER_ID', payload: authTokens.user })
    )
  ), []);

  return (
    <Switch>
      <Route exact path={`${url}/choose-category`} component={ChooseCategory} />
    </Switch>
  );
};

export default Order;
