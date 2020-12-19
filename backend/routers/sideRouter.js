import express from 'express';
import {
  getSides,
  getSideById,
  postSides,
} from '../controllers/sideController';

const sideRouter = express.Router();

sideRouter.get('/', getSides);
sideRouter.post('/', postSides);
sideRouter.get('/:sideId', getSideById);

export default sideRouter;
