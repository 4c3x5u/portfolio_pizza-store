import { getOrderHistory, getSides, getToppings } from '../api';

import toppings from '../__mocks__/data/toppings.json';
import sides from '../__mocks__/data/sides.json';

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

describe('getOrderHistory', () => {
  it('should get the order history for a given valid memberId', () => {
    expect.hasAssertions();
    const orders = [{
      _id: { $oid: '5fe643700191b8b234d95c9e' },
      __v: 0,
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
    }];
    return getOrderHistory('5fe8a190177d4f52b7d8bfb2')
      .then((result) => expect(result).toStrictEqual(orders))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('should return an error message for a given invalid memberId', () => {
    expect.hasAssertions();
    return getOrderHistory('asdklfjasldfkjasldfkjaka')
      .then((result) => expect(result).toStrictEqual({ message: 'Failed to get order history' }))
      .catch((error) => expect(error).toBeUndefined());
  });

  it('should return an error message if a memberId is not supplied', () => {
    expect.hasAssertions();
    return getOrderHistory()
      .then((result) => expect(result).toStrictEqual({ message: 'Failed to get order history' }))
      .catch((error) => expect(error).toBeUndefined());
  });
});
