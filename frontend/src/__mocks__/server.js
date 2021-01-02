import { rest } from 'msw';
import { setupServer } from 'msw/node';
import toppings from './data/toppings.json';

const handlers = [
  rest.get('http://localhost:4000/toppings', (req, res, ctx) => (
    res(ctx.status(200), ctx.json(toppings))
  )),
];

const server = setupServer(...handlers);

export { server, rest };
