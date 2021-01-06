import { rest } from 'msw';
import sides from '../data/sides.json';

const sideHandlers = [
  rest.get('http://localhost:4000/sides', (req, res, ctx) => (
    res(ctx.status(200), ctx.json(sides))
  )),
];

export default sideHandlers;
