import axios from 'axios'

export const postSignIn = (
  email, password, setAuthTokens, setIsLoggedIn, setErrorMessage
) =>
  axios
    .post('http://localhost:4000/members/sign-in', { email, password })
    .then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data)
        setIsLoggedIn(true)
      }
    })
    .catch(err =>
      setErrorMessage(`Invalid ${err.response.data.errors[0].param}.`)
    )

export const postRegister = (
  email, password, passwordConfirmation, setAuthTokens, setIsLoggedIn, setErrorMessage
) =>
  axios
    .post('http://localhost:4000/members/register', { email, password, passwordConfirmation })
    .then((result) => {
      if (result.status === 200) {
        setAuthTokens(result.data)
        setIsLoggedIn(true)
      }
    })
    .catch(err => {
      setErrorMessage(`Invalid ${err.response.data.errors[0].param}.`)
    })

export const validateAuthTokens = (user, token, setIsLoggedIn) =>
  axios
    .post('http://localhost:4000/members/validateToken', { user, token })
    .then(result => result.status === 200 && setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false))

export const getToppings = () =>
  axios
    .get('http://localhost:4000/toppings')
    .then(result => result.status === 200 && result.data)

export const getSides = () =>
  axios
    .get('http://localhost:4000/sides')
    .then(result => result.status === 200 && result.data)

export const getDrinks = () =>
  axios
    .get('http://localhost:4000/drinks')
    .then(result => result.status === 200 && result.data)

export const submitOrder = order =>
  axios
    .post('http://localhost:4000/order', order)
    .then(result => result.status === 200 && result.data)
    .catch(() => ({ message: 'Failed to post the order' }))

export const getOrderHistory = memberId =>
  axios
    .get(`http://localhost:4000/order/history/${memberId}`)
    .then(result => result.status === 200 && result.data)
    .catch(() => ({ message: 'Failed to post the order' }))
