import mongoose from 'mongoose';
import DrinkSchema from '../../models/drinkModel';

const Drink = mongoose.model('Drink', DrinkSchema);

const drink = Drink.findOne({name: 'Coca-Cola'});
if (drink === null) {
  Drink.insertMany({name: 'Coca-Cola'}, {price: 0.50}, {upsert: true});
}

export default initializeDrinks;
