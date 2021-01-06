import mongoose, { Types } from 'mongoose';
import ToppingSchema from '../models/toppingModel';

const Topping = mongoose.model('Topping', ToppingSchema);

// eslint-disable-next-line import/prefer-default-export
export const getToppings = (_req, res) => Topping.find(
  {},
  (err, toppings) => (err
    ? res.status(400).send(err)
    : res.status(200).send(toppings.map((topping) => topping.name))
  ),
);
