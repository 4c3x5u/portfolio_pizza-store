import {
  getToppings,
  getToppingById,
} from '../controllers/toppingController';

const toppingRoutes = (app) => {
  app.route('/toppings')
    .get(getToppings);

  app.route('/toppings/:toppingId')
    .get(getToppingById);
};

export default toppingRoutes;
