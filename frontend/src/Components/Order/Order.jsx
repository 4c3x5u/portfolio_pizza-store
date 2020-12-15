import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
// import { useAuth } from '../../context/auth';

import OrderStore from './OrderContext/OrderStore';
import ChooseCategory from './_ChooseCategory';

const Order = () => {
  const { url } = useRouteMatch();
  // const [state, dispatch] = useContext(OrderContext);
  // const { authTokens } = useAuth();

  // const memberId = () => (
  //   (authTokens && authTokens.user && authTokens.token) && (
  //     validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
  //   )
  // );

  // useEffect(() => (
  //   (authTokens && authTokens.user && authTokens.token) && (
  //     validateAuthTokens(authTokens.user, authTokens.token, setIsLoggedIn)
  //   )
  // ), []);

  return (
    <OrderStore>
      <Switch>
        <Route exact path={`${url}/choose-category`} component={ChooseCategory} />
      </Switch>
    </OrderStore>
  );
};

export default Order;
