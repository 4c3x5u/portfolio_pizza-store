import mongoose, { Types } from 'mongoose';
import ToppingSchema from '../models/toppingModel';

const Topping = mongoose.model('Topping', ToppingSchema);

export const getToppings = (_req, res) => Topping.find(
  {},
  (err, toppings) => (err
    ? res.status(400).send(err)
    : res.status(200).json(toppings.map((topping) => topping.name))
  ),
);

export const getToppingById = (req, res) => Topping.findOne(
  { _id: new Types.ObjectId(req.params.toppingId) },
  (err, topping) => (err ? res.status(400).send(err) : res.status(200).json(topping)),
);

export const postToppings = (req, res) => {
  req.body.toppings.forEach((d) => {
    const newTopping = new Topping(d);
    newTopping.save((err) => err && res.status(400).send(err));
  });
  res.status(400).send({ message: 'Toppings posted.' });
  return 0;
};
