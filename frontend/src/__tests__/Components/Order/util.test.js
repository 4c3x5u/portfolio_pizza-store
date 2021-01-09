/* eslint-disable no-undef */
import {
  arrayEmpty,
  orderEmpty,
  pizzasTotal,
  sidesOrDrinksTotal,
  orderTotal, inchesLookup,
} from '../../../Components/Order/util';

describe('arrayEmpty', () => {
  test('returns true for an empty array', () => {
    expect.assertions(1);
    const emptyArray = [];
    const res = arrayEmpty(emptyArray);
    expect(res).toBe(true);
  });

  test('returns false for a non-empty array', () => {
    expect.assertions(1);
    const nonEmptyArray = ['member1', 'member2'];
    const res = arrayEmpty(nonEmptyArray);
    expect(res).toBe(false);
  });
});

describe('orderEmpty', () => {
  test('returns true for an order that has empty pizzas, drinks and sides', () => {
    expect.assertions(1);
    const pizzas = [];
    const drinks = [];
    const sides = [];
    const res = orderEmpty(pizzas, sides, drinks);
    expect(res).toBe(true);
  });

  test('returns false if pizzas not empty', () => {
    expect.assertions(1);
    const pizzas = ['pizza'];
    const drinks = [];
    const sides = [];
    const res = orderEmpty(pizzas, sides, drinks);
    expect(res).toBe(false);
  });

  test('returns false if drinks not empty', () => {
    expect.assertions(1);
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];
    const res = orderEmpty(pizzas, sides, drinks);
    expect(res).toBe(false);
  });

  test('returns false if sides not empty', () => {
    expect.assertions(1);
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];
    const res = orderEmpty(pizzas, sides, drinks);
    expect(res).toBe(false);
  });
});

describe('pizzasTotal', () => {
  test('returns the string representation of total price for pizzas', () => {
    expect.assertions(1);
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    const res = pizzasTotal(pizzas);
    expect(res).toBe('39.72');
  });

  test('returns the string representation of 0 for empty pizzas', () => {
    expect.assertions(1);
    const pizzas = [];
    const res = pizzasTotal(pizzas);
    expect(res).toBe('0.00');
  });
});

describe('sidesOrDrinksTotal', () => {
  test('returns the string representation of total price for drinks or sides', () => {
    expect.assertions(1);
    const sidesOrDrinks = [{ price: 2.99, quantity: 3 }, { price: 3.49, quantity: 5 }];
    const res = sidesOrDrinksTotal(sidesOrDrinks);
    expect(res).toBe('26.42');
  });

  test('returns the string representation of 0 for empty drinks or sides', () => {
    expect.assertions(1);
    const sidesOrDrinks = [];
    const res = sidesOrDrinksTotal(sidesOrDrinks);
    expect(res).toBe('0.00');
  });
});

describe('orderTotal', () => {
  test('returns the string representation of the subtotal for all order item', () => {
    expect.assertions(1);
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    const sides = [{ price: 3.49, quantity: 1 }, { price: 2.99, quantity: 2 }];
    const drinks = [{ price: 1.20, quantity: 3 }, { price: 0.99, quantity: 1 }];
    const res = orderTotal(pizzas, sides, drinks);
    expect(res).toBe('53.78');
  });

  test('returns the string representation of zero for empty orders', () => {
    expect.assertions(1);
    const pizzas = [];
    const sides = [];
    const drinks = [];
    const res = orderTotal(pizzas, sides, drinks);
    expect(res).toBe('0.00');
  });
});

describe('inchesTotal', () => {
  test('returns the inches for the "small" size correctly', () => {
    expect.assertions(1);
    expect(inchesLookup('small')).toBe('10"');
  });

  test('returns the inches for the "medium" size correctly', () => {
    expect.assertions(1);
    expect(inchesLookup('medium')).toBe('14"');
  });

  test('returns the inches for the "large" size correctly', () => {
    expect.assertions(1);
    expect(inchesLookup('large')).toBe('18"');
  });
});
