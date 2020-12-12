import {
  getSides,
  getSideById,
} from '../controllers/sideController';

const sideRoutes = (app) => {
  app.route('/sides')
    .get(getSides);

  app.route('/sides/:sideId')
    .get(getSideById);
};

export default sideRoutes;
