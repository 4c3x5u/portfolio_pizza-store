import mongoose from 'mongoose';

const { Schema } = mongoose;

const PizzaSchema = new Schema({
  toppings: [
    { type: String, required: true },
  ],
  inches: { size: String, required: true },
  done: { type: Boolean, required: true },
  free: { type: Boolean, required: true },
  price: { type: Number, required: true },
});

export default PizzaSchema;
