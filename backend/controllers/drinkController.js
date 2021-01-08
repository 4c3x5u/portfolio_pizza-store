import mongoose from 'mongoose';
import DrinkSchema from '../models/drinkModel';

const Drink = mongoose.model('Drink', DrinkSchema);

// eslint-disable-next-line import/prefer-default-export
export const getDrinks = (_req, res) => (
  Drink.find({}, (err, drinks) => (
    err
      ? res.status(500).send({ message: 'Failed to get drinks from the database.' })
      : res.status(200).json(drinks.map((dbDrink) => ({
        name: dbDrink.name,
        price: dbDrink.price,
        quantity: 1,
      })))
  ))
);
