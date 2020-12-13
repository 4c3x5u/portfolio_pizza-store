import { register, login } from '../controllers/memberController';

const memberRoutes = (app) => {
  app.route('/register').post(register);
  app.route('/login').post(login);
};

export default memberRoutes;
