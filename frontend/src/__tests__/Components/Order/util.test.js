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
    const emptyArray = [];
    const result = arrayEmpty(emptyArray);
    expect(result).toBe(true);
  });

  test('returns false for a non-empty array', () => {
    const nonEmptyArray = ['member1', 'member2'];
    const result = arrayEmpty(nonEmptyArray);
    expect(result).toBe(false);
  });
});

describe('orderEmpty', () => {
  test('returns true for an order that has empty pizzas, drinks and sides', () => {
    const pizzas = [];
    const drinks = [];
    const sides = [];
    const result = orderEmpty(pizzas, sides, drinks);
    expect(result).toBe(true);
  });

  test('returns false if pizzas not empty', () => {
    const pizzas = ['pizza'];
    const drinks = [];
    const sides = [];
    const result = orderEmpty(pizzas, sides, drinks);
    expect(result).toBe(false);
  });

  test('returns false if drinks not empty', () => {
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];
    const result = orderEmpty(pizzas, sides, drinks);
    expect(result).toBe(false);
  });

  test('returns false if sides not empty', () => {
    const pizzas = [];
    const drinks = ['drink'];
    const sides = [];
    const result = orderEmpty(pizzas, sides, drinks);
    expect(result).toBe(false);
  });
});

describe('pizzasTotal', () => {
  test('returns the string representation of total price for pizzas', () => {
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    const result = pizzasTotal(pizzas);
    expect(result).toBe('39.72');
  });

  test('returns the string representation of 0 for empty pizzas', () => {
    const pizzas = [];
    const result = pizzasTotal(pizzas);
    expect(result).toBe('0.00');
  });
});

describe('sidesOrDrinksTotal', () => {
  test('returns the string representation of total price for drinks or sides', () => {
    const sidesOrDrinks = [{ price: 2.99, quantity: 3 }, { price: 3.49, quantity: 5 }];
    const result = sidesOrDrinksTotal(sidesOrDrinks);
    expect(result).toBe('26.42');
  });

  test('returns the string representation of 0 for empty drinks or sides', () => {
    const sidesOrDrinks = [];
    const result = sidesOrDrinksTotal(sidesOrDrinks);
    expect(result).toBe('0.00');
  });
});

describe('orderTotal', () => {
  test('returns the string representation of the subtotal for all order item', () => {
    const pizzas = [{ price: 12.99 }, { price: 14.49 }, { price: 12.24 }];
    const sides = [{ price: 3.49, quantity: 1 }, { price: 2.99, quantity: 2 }];
    const drinks = [{ price: 1.20, quantity: 3 }, { price: 0.99, quantity: 1 }];
    const result = orderTotal(pizzas, sides, drinks);
    expect(result).toBe('53.78');
  });

  test('returns the string representation of zero for empty orders', () => {
    const pizzas = [];
    const sides = [];
    const drinks = [];
    const result = orderTotal(pizzas, sides, drinks);
    expect(result).toBe('0.00');
  });
});

describe('inchesTotal', () => {
  test('returns the inches for the "small" size correctly', () => {
    expect(inchesLookup('small')).toBe('10"');
  });

  test('returns the inches for the "medium" size correctly', () => {
    expect(inchesLookup('medium')).toBe('14"');
  });

  test('returns the inches for the "large" size correctly', () => {
    expect(inchesLookup('large')).toBe('18"');
  });
});
