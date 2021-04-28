import { rest } from 'msw';
import { setupServer } from 'msw/node';

import memberHandlers from './handlers/memberHandlers';
import orderHandlers from './handlers/orderHandlers';
import toppingHandlers from './handlers/toppingHandlers';
import sideHandlers from './handlers/sideHandlers';
import drinkHandlers from './handlers/drinkHandlers';

const server = setupServer(
  ...memberHandlers,
  ...orderHandlers,
  ...toppingHandlers,
  ...sideHandlers,
  ...drinkHandlers,
);

export { server, rest };
