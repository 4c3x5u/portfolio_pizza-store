import { rest } from 'msw';
import { setupServer } from 'msw/node';

import toppings from './data/toppings.json';
import sides from './data/sides.json';
import drinks from './data/drinks.json';
import orderHistory from './data/order-history.json';

const lh = 'http://localhost:4000';

/*
export const submitOrder = (order) => axios
  .post('http://localhost:4000/order', order)
  .then((result) => result.status === 200 && result.data)
  .catch(() => ({ message: 'Failed to post the order' }));
 */

const handlers = [
  rest.post(`${lh}/members/register`, (req, res, ctx) => {
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
      return res(ctx.status(400), ctx.json({ message: 'Register failed.' }));
    }
    return res(ctx.status(200), ctx.json({ user: req.body.email, token: req.body.password }));
  }),
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
  rest.post(`${lh}/order`, (req, res, ctx) => {
    if (req.body === undefined || req.body.address === undefined ||
        req.body.date === undefined || req.body.memberId === undefined ||
        req.body.paymentDetails === undefined || req.body.phoneNumber === undefined) {
      return res(ctx.status(400))
    }
    return res(ctx.status(200), ctx.json(req.body))
  }),
];

const server = setupServer(...handlers);

export { server, rest };
