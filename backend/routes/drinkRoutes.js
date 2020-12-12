import {
  getAllDrinks,
  addNewDrink,
  getDrink,
  updateDrink,
  deleteDrink,
} from '../controllers/drinkController';

const routes = (app) => {
  app.route('/drinks')
      .get(getAllDrinks)
      .post(addNewDrink);

  app.route('/drinks/:drinkId')
      .get(getDrink)
      .put(updateDrink)
      .delete(deleteDrink);
};

export default routes;
