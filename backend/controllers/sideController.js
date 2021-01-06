import mongoose, { Types } from 'mongoose';
import SideSchema from '../models/sideModel';

const Side = mongoose.model('Side', SideSchema);

// eslint-disable-next-line import/prefer-default-export
export const getSides = (_req, res) => Side.find(
  {},
  (err, drinks) => (
    err
      ? res.send(err)
      : res.json(drinks.map((dbSide) => ({
        name: dbSide.name,
        price: dbSide.price,
        quantity: 1,
      })))
  ),
);
