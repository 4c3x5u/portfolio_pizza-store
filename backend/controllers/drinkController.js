import mongoose, { Types } from 'mongoose';
import DrinkSchema from '../models/drinkModel';

const Drink = mongoose.model('Drink', DrinkSchema);

// eslint-disable-next-line import/prefer-default-export
export const getDrinks = (_req, res) => {
  Drink.find({}, (err, drinks) => (err
    ? res.send(err)
    : res.json(drinks.map((dbDrink) => ({
      name: dbDrink.name,
      price: dbDrink.price,
      quantity: 1,
    })))),
  );
};
