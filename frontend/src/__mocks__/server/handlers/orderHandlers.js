import { rest } from 'msw';

const orderHandlers = [
  rest.get('http://localhost:4000/order/history/:memberId', (req, res, ctx) => {
    if (req.body === {} || req.params.memberId !== '5fe8a190177d4f52b7d8bfb2') {
      return res(ctx.status(400), ctx.json({ errorMessage: 'Invalid order history request.' }));
    }
    return res(ctx.status(200), ctx.text('Order history request successful.'));
  }),

  rest.post('http://localhost:4000/order', (req, res, ctx) => {
    if (req.body === undefined || req.body.address === undefined
        || req.body.date === undefined || req.body.memberId === undefined
        || req.body.paymentDetails === undefined || req.body.phoneNumber === undefined) {
      return res(ctx.status(400), ctx.json({
        errorMessage: 'One or more order submission fields undefined.',
      }));
    }
    return res(ctx.status(200), ctx.json(req.body));
  }),
];

export default orderHandlers;
