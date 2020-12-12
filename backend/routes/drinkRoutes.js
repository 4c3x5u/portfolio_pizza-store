import {
  getDrinks,
  getDrinkById,
} from '../controllers/drinkController';

const drinkRoutes = (app) => {
  app.route('/drinks')
    .get(getDrinks);

  app.route('/drinks/:drinkId')
    .get(getDrinkById);
};

export default drinkRoutes;
