import mongoose from 'mongoose';
import ToppingSchema from '../models/toppingModel';

const Topping = mongoose.model('Topping', ToppingSchema);

// eslint-disable-next-line import/prefer-default-export
export const getToppings = (_req, res) => Topping.find({}, (err, toppings) => (err
  ? res.status(500).send({ message: 'Failed to get toppings from the database' })
  : res.status(200).send(toppings.map((topping) => ({ name: topping.name })))
));
