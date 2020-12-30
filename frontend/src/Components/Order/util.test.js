/* eslint-disable no-undef */
import { arrayEmpty } from './util';

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
