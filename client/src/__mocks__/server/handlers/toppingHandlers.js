import { rest } from 'msw';
import toppings from '../data/toppings.json';

const toppingHandlers = [
  rest.get('http://localhost:4000/toppings', (req, res, ctx) => (
    res(ctx.status(200), ctx.json(toppings))
  )),
];

export default toppingHandlers;
