import axios from 'axios';

const handleServerCall = (callServer) => (
  callServer()
    .then((response) => ({
      status: response.status,
      data: response.data,
    }))
    .catch((error) => ({
      status: error.statusCode || error.status || 400,
      data: (error.response && error.response.data) || error || 'Request failed',
    }))
);

export const postSignIn = (email, password) => handleServerCall(
  () => axios.post('http://localhost:4000/members/sign-in', { email, password }),
);

export const postRegister = (email, password, passwordConfirmation) => handleServerCall(
  () => axios.post('http://localhost:4000/members/register', { email, password, passwordConfirmation }),
);

export const validateAuthTokens = (user, token) => handleServerCall(
  () => axios.post('http://localhost:4000/members/validate-token', { user, token }),
);

export const getToppings = () => handleServerCall(
  () => axios.get('http://localhost:4000/toppings'),
);

export const getSides = () => handleServerCall(
  () => axios.get('http://localhost:4000/sides'),
);

export const getDrinks = () => handleServerCall(
  () => axios.get('http://localhost:4000/drinks'),
);

export const submitOrder = (order) => handleServerCall(
  () => axios.post('http://localhost:4000/order', order),
);

export const getOrderHistory = (memberId) => handleServerCall(
  () => axios.get(`http://localhost:4000/order/history/${memberId}`),
);
