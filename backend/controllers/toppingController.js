import mongoose from 'mongoose';
import ToppingSchema from '../models/toppingModel';

const Topping = mongoose.model('Topping', ToppingSchema);

export const getToppings = (_req, res) => {
  Topping.find({}, (err, topping) => (
    err ? res.send(err) : res.json(topping)
  ));
};

export const getToppingById = (req, res) => {
  Topping.findById(req.params.toppingId, (err, topping) => (
    err ? res.send(err) : res.json(topping)
  ));
};
