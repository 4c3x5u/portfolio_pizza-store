import mongoose from 'mongoose';
import DrinkSchema from '../models/drinkModel';

const Drink = mongoose.model('Drink', DrinkSchema);

export const getAllDrinks = (_req, res) => {
  Drink.find({}, (err, drinks) => {
    if (err) {
      res.send(err);
    }
    res.json(drinks);
  });
};

export const getDrink = (req, res) => {
  Drink.findById(req.params.drinkId, (err, player) => {
    if (err) {
      res.send(err);
    }
    res.json(player);
  });
};
