import express from 'express';
import {
  getSides,
  getSideById,
} from '../controllers/sideController';

const sideRouter = express.Router();

sideRouter.get('/', getSides);
sideRouter.get('/:sideId', getSideById);

export default sideRouter;
