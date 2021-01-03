import { rest } from 'msw';
import { setupServer } from 'msw/node';

import toppings from './data/toppings.json';
import sides from './data/sides.json';
import drinks from './data/drinks.json';
import orderHistory from './data/order-history.json';

const lh = 'http://localhost:4000';

/*
export const getHistory = (req, res) => (
  Order.find({ memberId: req.params.memberId }, (err, orders) => (
    err
      ? res.status(400).send(err)
      : res.send(orders)))
);
 */

const handlers = [
  rest.get(`${lh}/toppings`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(toppings))
  )),
  rest.get(`${lh}/sides`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(sides))
  )),
  rest.get(`${lh}/drinks`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(drinks))
  )),
  rest.get(`${lh}/order/history/:memberId`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(
      orderHistory
        .find((oh) => oh.member === req.params.memberId)
        .orders,
    ))
  )),
];

const server = setupServer(...handlers);

export { server, rest };
