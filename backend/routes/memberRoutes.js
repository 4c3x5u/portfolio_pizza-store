import { register, login, validateToken } from '../controllers/memberController';

const memberRoutes = (app) => {
  app.route('/register').post(register);
  app.route('/login').post(login);
  app.route('/validateToken').post(validateToken);
};

export default memberRoutes;
