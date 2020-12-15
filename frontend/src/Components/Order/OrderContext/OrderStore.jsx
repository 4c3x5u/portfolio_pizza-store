import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import Reducer from './OrderReducer';

const initialState = {
  id: '',
  memberId: '',
  total: 0,
  submitted: false,
  points: 0,
  pizzas: [],
  drinks: [],
  sides: [],
  paymentDetails: {
    accountNumber: '',
    sortCode: '',
    securityCode: '',
    addressId: '',
  },
  address: {
    firstLine: '',
    secondLine: '',
    postcode: '',
  },
  phoneNumber: '',
};

const OrderStore = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {children}
    </OrderContext.Provider>
  );
};

OrderStore.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export const OrderContext = createContext(initialState);

export default OrderStore;
