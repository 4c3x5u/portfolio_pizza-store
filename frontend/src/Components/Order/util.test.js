/* eslint-disable no-undef */
import { arrayEmpty, orderEmpty } from './util';

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
    const order = {
      pizzas: [],
      drinks: [],
      sides: [],
    };
    expect(orderEmpty(order.pizzas, order.sides, order.drinks)).toBe(true);
  });

  test('returns false for an order that has non-empty pizzas', () => {
    const order = {
      memberId: '',
      pizzas: ['pizza'],
      drinks: [],
      sides: [],
    };
    expect(orderEmpty(order.pizzas, order.sides, order.drinks)).toBe(false);
  });

  test('returns false for an order that has non-empty drinks', () => {
    const order = {
      pizzas: [],
      drinks: ['drink'],
      sides: [],
    };
    expect(orderEmpty(order.pizzas, order.sides, order.drinks)).toBe(false);
  });

  test('returns false for an order that has non-empty sides', () => {
    const order = {
      pizzas: [],
      drinks: ['drink'],
      sides: [],
    };
    expect(orderEmpty(order.pizzas, order.sides, order.drinks)).toBe(false);
  });
});
