import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
  name: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
});

export default DrinkSchema;
