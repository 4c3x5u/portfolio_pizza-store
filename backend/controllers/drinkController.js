import mongoose from 'mongoose';
import DrinkSchema from '../models/drinkModel';
import initializeDrinks from './scripts/initializeDrinks';

const Drink = mongoose.model('Drink', DrinkSchema);
// const ObjectId = mongoose.Types.ObjectId;
initializeDrinks();

export const addNewDrink = (req, res) => {
  console.log(req.body);
  const newDrink = new Drink(req.body);
  newDrink.save((err, player) => {
    if (err) {
      res.send(err);
    }
    res.json(player);
  });
};

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

export const updateDrink = (req, res) => {
  Drink.findOneAndUpdate(
      {_id: req.params.drinkId}, req.body, {new: true}, (err, player) => {
        if (err) {
          res.send(err);
        }
        res.json(player);
      });
};

export const deleteDrink = (req, res) => {
  Drink.findByIdAndDelete(req.params.drinkId, (err, _player) => {
    if (err) {
      res.send(err);
    }
    res.json({message: 'Successfully deleted player.'});
  });
};
