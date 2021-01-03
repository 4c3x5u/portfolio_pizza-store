import { rest } from 'msw';
import drinks from '../../data/drinks.json';

const drinkHandlers = [
  rest.get('http://localhost:4000/drinks', (req, res, ctx) => (
    res(ctx.status(200), ctx.json(drinks))
  )),
];

export default drinkHandlers;
