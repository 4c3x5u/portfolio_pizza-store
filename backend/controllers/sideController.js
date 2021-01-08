import mongoose from 'mongoose';
import SideSchema from '../models/sideModel';

const Side = mongoose.model('Side', SideSchema);

// eslint-disable-next-line import/prefer-default-export
export const getSides = (_req, res) => Side.find({}, (err, drinks) => (err
  ? res.status(500).send({ message: 'Failed to get sides from the database.' })
  : res.status(200).send(drinks.map((dbSide) => ({
    name: dbSide.name,
    price: dbSide.price,
    quantity: 1,
  })))
));
