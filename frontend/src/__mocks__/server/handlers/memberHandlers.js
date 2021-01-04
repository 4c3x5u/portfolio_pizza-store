import { rest } from 'msw';
import members from '../../data/members.json';

const memberHandlers = [
  rest.post('http://localhost:4000/members/register', (req, res, ctx) => {
    if (req.body === {}
        || req.body.email === undefined
        || req.body.password === undefined
        || req.body.passwordConfirmation === undefined) {
      return res(ctx.status(400), ctx.json({
        errorMessage: 'One or more register request fields undefined.',
      }));
    }
    return res(ctx.status(200), ctx.json({ user: req.body.email, token: req.body.password }));
  }),

  rest.post('http://localhost:4000/members/sign-in', (req, res, ctx) => {
    if (req.body === {} || req.body.email === undefined || req.body.password === undefined) {
      return res(ctx.status(400), ctx.json({
        errorMessage: 'One or more sign-in request fields undefined.',
      }));
    }
    return res(ctx.status(200), ctx.json({ user: req.body.email, token: req.body.password }));
  }),

  rest.post('http://localhost:4000/members/validate-token', (req, res, ctx) => {
    if (req.body === {} || req.body.user === undefined || req.body.token === undefined) {
      return res(ctx.status(400), ctx.json({
        errorMessage: 'One or more token validation request fields undefined.',
      }));
    }
    return res(ctx.status(200), ctx.json({ message: 'Token validation successful.' }));
  }),
];

export default memberHandlers;
