import express from 'express';
import {
  getSides,
  getSideById,
} from '../controllers/sideController';

const sidesRouter = express.Router();

sidesRouter.get('/', getSides);
sidesRouter.get('/:sideId', getSideById);

export default sidesRouter;
