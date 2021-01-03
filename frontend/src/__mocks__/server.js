import { rest } from 'msw';
import { setupServer } from 'msw/node';

import toppings from './data/toppings.json';
import sides from './data/sides.json';
import drinks from './data/drinks.json';
import orderHistory from './data/order-history.json';
import members from './data/members.json';

const lh = 'http://localhost:4000';

const membersHandlers = [
  rest.post(`${lh}/members/register`, (req, res, ctx) => {
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
      return res(ctx.status(400), ctx.json({ errorMessage: 'Register failed.' }));
    }
    return res(ctx.status(200), ctx.json({ user: req.body.email, token: req.body.password }));
  }),

  rest.post(`${lh}/members/sign-in`, (req, res, ctx) => {
    if (req.body === undefined || req.body.email === undefined
        || req.body.password === undefined || req.body.passwordConfirmation) {
      return res(ctx.status(400), ctx.json({ errorMessage: 'Register failed.' }));
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      return res(
        ctx.status(200),
        ctx.json({ errorMessage: 'Password confirmation do not match the password' }),
      );
    }
    const member = members.find((registeredMember) => registeredMember.email === req.body.email);
    if (!member) {
      return res(ctx.status(400), ctx.json({ errorMessage: 'Member not found.' }));
    }
    if (member.password !== req.body.password) {
      return res(ctx.status(400), ctx.json({ errorMessage: 'Incorrect password.' }));
    }
    return res(ctx.status(200), ctx.json({ user: req.body.email, token: req.body.password }));
  }),
];

const orderHandlers = [
  rest.get(`${lh}/order/history/:memberId`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(
      orderHistory.find((oh) => oh.member === req.params.memberId).orders,
    ))
  )),

  rest.post(`${lh}/order`, (req, res, ctx) => {
    if (req.body === undefined || req.body.address === undefined
        || req.body.date === undefined || req.body.memberId === undefined
        || req.body.paymentDetails === undefined || req.body.phoneNumber === undefined) {
      return res(ctx.status(400));
    }
    return res(ctx.status(200), ctx.json(req.body));
  }),
];

const otherHandlers = [
  rest.get(`${lh}/toppings`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(toppings))
  )),

  rest.get(`${lh}/sides`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(sides))
  )),

  rest.get(`${lh}/drinks`, (req, res, ctx) => (
    res(ctx.status(200), ctx.json(drinks))
  )),
];

const server = setupServer(
  ...membersHandlers,
  ...orderHandlers,
  ...otherHandlers,
);

export { server, rest };
