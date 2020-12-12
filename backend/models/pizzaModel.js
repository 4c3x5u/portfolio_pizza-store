import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PizzaSchema = new Schema({
  toppings: [
    {type: String, required: true},
  ],
  inches: {type: Number, required: true},
  done: {type: Boolean, required: true},
  free: {type: Boolean, required: true},
  price: {type: Number, required: true},
});

export default PizzaSchema;
