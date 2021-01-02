import { getToppings } from '../api';
import toppings from '../__mocks__/data/toppings.json';

test('Gets toppings from the server', () => {
  getToppings()
    .then((result) => expect(result).toBe(toppings));
});
