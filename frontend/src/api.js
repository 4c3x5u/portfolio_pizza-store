import axios from 'axios';

const handleServerCall = (callServer) => (
  callServer()
    .then((res) => ({
      status: res.status,
      data: res.data,
    }))
    .catch((err) => ({
      status: err.statusCode || err.status || 400,
      data: (err.response && err.response.data) || err || 'Request failed',
    }))
);

export const postSignIn = (email, password) => handleServerCall(
  () => axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/member/sign-in`,
    { email, password },
  ),
);

export const postRegister = (email, password, passwordConfirmation) => handleServerCall(
  () => axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/member/register`,
    { email, password, passwordConfirmation },
  ),
);

export const validateAuthTokens = (user, token) => handleServerCall(
  () => axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/member/validate-token`,
    { user, token },
  ),
);

export const getToppings = () => handleServerCall(
  () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/toppings`),
);

export const getSides = () => handleServerCall(
  () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/sides`),
);

export const getDrinks = () => handleServerCall(
  () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/drinks`),
);

export const submitOrder = (order) => handleServerCall(
  () => axios.post(`${process.env.REACT_APP_BACKEND_URL}/order`, order),
);

export const getOrderHistory = (memberId) => handleServerCall(
  () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/history/${memberId}`),
);
