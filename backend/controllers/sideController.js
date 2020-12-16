import mongoose, { Types } from 'mongoose';
import SideSchema from '../models/sideModel';

const Side = mongoose.model('Side', SideSchema);

export const getSides = (_req, res) => {
  Side.find({}, (err, drinks) => (
    err ? res.send(err) : res.json(drinks)
  ));
};

export const getSideById = (req, res) => {
  Side.findOne({ _id: new Types.ObjectId(req.params.drinkId) }, (err, player) => (
    err ? res.send(err) : res.json(player)
  ));
};
