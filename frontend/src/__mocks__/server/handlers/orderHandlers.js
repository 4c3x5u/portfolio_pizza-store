import { rest } from 'msw';
import orderHistory from '../../data/order-history.json';

const orderHandlers = [
  rest.get('http://localhost:4000/order/history/:memberId', (req, res, ctx) => (
    res(ctx.status(200), ctx.json(
      orderHistory.find((oh) => oh.member === req.params.memberId).orders,
    ))
  )),

  rest.post('http://localhost:4000/order', (req, res, ctx) => {
    if (req.body === undefined || req.body.address === undefined
        || req.body.date === undefined || req.body.memberId === undefined
        || req.body.paymentDetails === undefined || req.body.phoneNumber === undefined) {
      return res(ctx.status(400));
    }
    return res(ctx.status(200), ctx.json(req.body));
  }),
];

export default orderHandlers;

