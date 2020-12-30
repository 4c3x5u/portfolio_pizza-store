/* eslint-disable no-undef */
import {
  arrayEmpty,
  orderEmpty,
  pizzasTotal,
  sidesOrDrinksTotal,
  orderTotal,
} from './util';

describe('arrayEmpty', () => {
  test('returns true for an empty array', () => {
    const emptyArray = [];
    expect(
      arrayEmpty(emptyArray),
    ).toBe(true);
  });

  test('returns false for a non-empty array', () => {
    const nonEmptyArray = ['member1', 'member2'];
    expect(
      arrayEmpty(nonEmptyArray),
    ).toBe(false);
  });
});

describe('orderEmpty', () => {
  test('returns true for an order that has empty pizzas, drinks and sides', () => {
    const pizzas = [];
    const drinks = [];
    const sides = [];

    expect(orderEmpty(pizzas, sides, drinks)).toBe(true);
  });

  test('returns false if pizzas not empty', () => {
    const pizzas = ['pizza'];
    const drinks = [];
    const sides = [];

    expect(orderEmpty(pizzas, sides, drinks)).toBe(false);
  });

  test('returns false if drinks not empty', () => {
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];
    expect(orderEmpty(pizzas, sides, drinks)).toBe(false);
  });

  test('returns false if sides not empty', () => {
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];

    expect(orderEmpty(pizzas, sides, drinks)).toBe(false);
  });
});

describe('pizzasTotal', () => {
  test('returns the string representation of total price for pizzas', () => {
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    expect(pizzasTotal(pizzas)).toEqual('39.72');
  });
});

describe('sidesOrDrinksTotal', () => {
  test('returns the string representation of total price for drinks or sides', () => {
    const sides = [{ price: 2.99, quantity: 3 }, { price: 3.49, quantity: 5 }];
    expect(sidesOrDrinksTotal(sides)).toEqual('26.42');
  });
});

describe('orderTotal', () => {
  test('returns the string representation of the subtotal for all order item', () => {
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    const sides = [{ price: 3.49, quantity: 1 }, { price: 2.99, quantity: 2 }];
    const drinks = [{ price: 1.20, quantity: 3 }, { price: 0.99, quantity: 1 }];

    expect(orderTotal(pizzas, sides, drinks)).toBe('53.78');
  });
});
