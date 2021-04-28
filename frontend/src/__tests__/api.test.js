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

import toppings from '../__mocks__/server/data/toppings.json';
import sides from '../__mocks__/server/data/sides.json';
import drinks from '../__mocks__/server/data/drinks.json';

describe('postRegister', () => {
  const email = 'member@example.com';
  const password = '53cur3p455w0rd';

  it('should return authentication tokens on successful register', () => {
    expect.hasAssertions();
    return postRegister(email, password, password)
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: { user: email, token: password },
      }))
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return error from the server for an invalid register request', () => {
    expect.hasAssertions();
    return postRegister()
      .then((res) => expect(res).toStrictEqual({
        status: 400,
        data: 'One or more register request fields undefined.',
      }))
      .catch((err) => expect(err).toBeUndefined());
  });
});

describe('postSignIn', () => {
  it('should return authentication tokens on successful sign in', () => {
    expect.hasAssertions();

    const email = 'member@example.com';
    const password = '53cur3p455w0rd';

    return postSignIn(email, password, password)
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: { user: email, token: password },
      }))
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return error from the server for an invalid sign in request', () => {
    expect.hasAssertions();

    return postSignIn()
      .then((res) => (
        expect(res).toStrictEqual({
          status: 400,
          data: 'One or more sign-in request fields undefined.',
        })
      )).catch((err) => expect(err).toBeUndefined());
  });
});

describe('validateAuthTokens', () => {
  const user = 'member@example.com';
  const token = '53cur3p455w0rd';

  it('should return success message on successful token validation', () => {
    expect.hasAssertions();
    return validateAuthTokens(user, token)
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: 'Token validation successful.',
      }))
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return error from the server for an invalid token validation request', () => {
    expect.hasAssertions();
    return validateAuthTokens()
      .then((res) => expect(res).toStrictEqual({
        status: 400,
        data: 'One or more token validation request fields undefined.',
      })).catch((err) => expect(err).toBeUndefined());
  });
});

describe('getToppings', () => {
  it('should return the full list of toppings from the server', () => {
    expect.hasAssertions();
    return getToppings()
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: toppings,
      }))
      .catch((err) => expect(err).toBeUndefined());
  });
});

describe('getSides', () => {
  it('should get the full list fo sides from the server', () => {
    expect.hasAssertions();
    return getSides()
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: sides,
      }))
      .catch((err) => expect(err).toBeUndefined());
  });
});

describe('getDrinks', () => {
  it('should get the full list fo drinks from the server', () => {
    expect.hasAssertions();
    return getDrinks()
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: drinks,
      }))
      .catch((err) => expect(err).toBeUndefined());
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
      .then((res) => expect(res).toStrictEqual({ status: 200, data: order }))
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return an error message on empty submission', () => {
    expect.hasAssertions();
    return submitOrder()
      .then((res) => expect(res).toStrictEqual({
        status: 400,
        data: 'One or more order submission fields undefined.',
      }))
      .catch((err) => expect(err).toBeUndefined());
  });
});

describe('getOrderHistory', () => {
  it('should get the order history for a given valid memberId', () => {
    expect.hasAssertions();
    return getOrderHistory('5fe8a190177d4f52b7d8bfb2')
      .then((res) => expect(res).toStrictEqual({
        status: 200,
        data: 'Order history request successful.',
      }))
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return an error message for an invalid order history request', () => {
    expect.hasAssertions();
    return getOrderHistory()
      .then((res) => expect(res).toStrictEqual({
        status: 400,
        data: 'Invalid order history request.',
      }))
      .catch((err) => expect(err).toBeUndefined());
  });
});
