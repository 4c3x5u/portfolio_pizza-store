import {
  postRegister,
  postSignIn,
  validateAuthTokens,
  getSides,
  getToppings,
  getDrinks,
  submitOrder,
  getOrderHistory,
} from '../api';

import toppings from '../__mocks__/data/toppings.json';
import sides from '../__mocks__/data/sides.json';
import drinks from '../__mocks__/data/drinks.json';

describe('postRegister', () => {
  const email = 'member@example.com';
  const password = '53cur3p455w0rd';

  it('returns authentication tokens on successful register', () => {
    expect.hasAssertions();
    return postRegister(email, password, password)
      .then((result) => expect(result).toStrictEqual({ user: email, token: password }))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('returns error from the server for an invalid register request', () => {
    expect.hasAssertions();
    return postRegister()
      .then((result) => expect(result).toStrictEqual({
        error: {
          status: 400,
          message: 'One or more register request fields undefined.',
        },
      })).catch((error) => expect(error).toBeUndefined());
  });
});

describe('postSignIn', () => {
  it('returns authentication tokens on successful sign in', () => {
    expect.hasAssertions();

    const email = 'member@example.com';
    const password = '53cur3p455w0rd';

    return postSignIn(email, password, password)
      .then((result) => expect(result).toStrictEqual({ user: email, token: password }))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('returns error from the server for an invalid sign in request', () => {
    expect.hasAssertions();

    return postSignIn()
      .then((result) => (
        expect(result).toStrictEqual({
          error: {
            status: 400,
            message: 'One or more sign-in request fields undefined.',
          },
        })
      )).catch((error) => expect(error).toBeUndefined());
  });
});

describe('validateAuthTokens', () => {
  const user = 'member@example.com';
  const token = '53cur3p455w0rd';

  it('returns success message on successful token validation', () => {
    expect.hasAssertions();
    return validateAuthTokens(user, token)
      .then((result) => expect(result).toStrictEqual({ message: 'Token validation successful.' }))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('returns error from the server for an invalid token validation request', () => {
    expect.hasAssertions();
    return validateAuthTokens()
      .then((result) => expect(result).toStrictEqual({
        error: {
          status: 400,
          message: 'One or more token validation request fields undefined.',
        },
      })).catch((error) => expect(error).toBeUndefined());
  });
});

describe('getToppings', () => {
  it('should get the full list of toppings from the server', () => {
    expect.hasAssertions();
    return getToppings()
      .then((result) => expect(result).toStrictEqual(toppings))
      .catch((error) => expect(error).toBeUndefined());
  });
});

describe('getSides', () => {
  it('should get the full list fo sides from the server', () => {
    expect.hasAssertions();
    return getSides()
      .then((result) => expect(result).toStrictEqual(sides))
      .catch((error) => expect(error).toBeUndefined());
  });
});

describe('getDrinks', () => {
  it('should get the full list fo drinks from the server', () => {
    expect.hasAssertions();
    return getDrinks()
      .then((result) => expect(result).toStrictEqual(drinks))
      .catch((error) => expect(error).toBeUndefined());
  });
});

describe('submitOrder', () => {
  it('should return the order back on successful submission', () => {
    expect.hasAssertions();
    const order = {
      address: {
        firstLine: '31 Here Street',
        secondLine: 'Over-There Rd.',
        postcode: 'EN2 0DE',
      },
      date: 'December 25th 2020, 7:54:06 pm',
      drinks: [
        {
          _id: { $oid: '5fe643700191b8b234d95ca0' },
          name: 'Coca-Cola',
          quantity: 1,
        },
        {
          _id: { $oid: '5fe643700191b8b234d95ca1' },
          name: 'Ice-Tea Lemon',
          quantity: 3,
        },
      ],
      memberId: '4fa54264d372a605a82a200d',
      paymentDetails: {
        cardNumber: '4111 1111 1111 1111',
        expiryDate: '12/42',
        securityCode: '123',
      },
      phoneNumber: '09876543210',
      pizzas: [
        {
          toppings: ['Onion', 'Extra Cheese'],
          _id: { $oid: '5fe643700191b8b234d95c9f' },
          size: 'medium',
          price: 14.65,
        },
      ],
      sides: [
        {
          _id: { $oid: '5fe643700191b8b234d95ca2' },
          name: 'Chicken Wings',
          quantity: 4,
        },
        {
          _id: { $oid: '5fe643700191b8b234d95ca3' },
          name: 'Potato Chips',
          quantity: 2,
        },
      ],
    };
    return submitOrder(order)
      .then((result) => expect(result).toStrictEqual(order))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('should return an error message on empty submission', () => {
    expect.hasAssertions();
    return submitOrder()
      .then((result) => expect(result).toStrictEqual({
        error: {
          status: 400,
          message: 'One or more order submission fields undefined.',
        },
      }))
      .catch((error) => expect(error).toBeUndefined());
  });
});

describe('getOrderHistory', () => {
  it('should get the order history for a given valid memberId', () => {
    expect.hasAssertions();
    return getOrderHistory('5fe8a190177d4f52b7d8bfb2')
      .then((result) => expect(result).toStrictEqual('Order history request successful.'))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('returns an error message for an invalid order history request', () => {
    expect.hasAssertions();
    return getOrderHistory()
      .then((result) => expect(result).toStrictEqual({
        error: {
          status: 400,
          message: 'Invalid order history request.',
        },
      }))
      .catch((error) => expect(error).toBeUndefined());
  });
});
