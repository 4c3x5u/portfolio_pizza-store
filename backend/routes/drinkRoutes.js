import {
  getAllDrinks,
  getDrink,
} from '../controllers/drinkController';

const drinkRoutes = (app) => {
  app.route('/drinks')
    .get(getAllDrinks);

  app.route('/drinks/:drinkId')
    .get(getDrink);
};

export default drinkRoutes;
