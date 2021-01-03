import axios from 'axios';

// .catch(es) => use a generic error message here, and more specific ones in the actual routers.

export const postSignIn = (email, password) => axios
  .post('http://localhost:4000/members/sign-in', { email, password })
  .then((result) => result.data)
  .catch((error) => ({
    errorMessage: {
      readable: 'Sign in failed.',
      raw: error.message,
    },
  }));

export const postRegister = (email, password, passwordConfirmation) => axios
  .post('http://localhost:4000/members/register', { email, password, passwordConfirmation })
  .then((result) => result.data)
  .catch((error) => ({
    errorMessage: {
      readable: 'Register failed.',
      raw: error.message,
    },
  }));

export const validateAuthTokens = (user, token, setIsLoggedIn) => axios
  .post('http://localhost:4000/members/validateToken', { user, token })
  .then((result) => result.status === 200 && setIsLoggedIn(true))
  .catch(() => setIsLoggedIn(false));

export const getToppings = () => axios
  .get('http://localhost:4000/toppings')
  .then((result) => result.status === 200 && result.data);

export const getSides = () => axios
  .get('http://localhost:4000/sides')
  .then((result) => result.status === 200 && result.data);

export const getDrinks = () => axios
  .get('http://localhost:4000/drinks')
  .then((result) => result.status === 200 && result.data);

export const submitOrder = (order) => axios
  .post('http://localhost:4000/order', order)
  .then((result) => result.status === 200 && result.data)
  .catch(() => ({ message: 'Failed to submit the order.' }));

export const getOrderHistory = (memberId) => axios
  .get(`http://localhost:4000/order/history/${memberId}`)
  .then((result) => result.data)
  .catch(() => ({ message: 'Failed to get order history.' }));
