import mongoose, { Types } from 'mongoose';
import SideSchema from '../models/sideModel';

const Side = mongoose.model('Side', SideSchema);

export const getSides = (_req, res) => Side.find(
  {},
  (err, drinks) => (err ? res.send(err) : res.json(drinks)),
);

export const getSideById = (req, res) => Side.findOne(
  { _id: new Types.ObjectId(req.params.drinkId) },
  (err, player) => (err ? res.send(err) : res.json(player)),
);

export const postSides = (req, res) => {
  req.body.sides.forEach((side) => {
    const newSide = new Side(side);
    newSide.save((err) => (err && res.send(err)));
  });
  res.send({ message: 'Sides posted' });
  return 0;
};
