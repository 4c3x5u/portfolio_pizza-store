import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ToppingSchema = new Schema ({
  name: { type: String, required: true },
  price: { type: Number, required: True },
});

export default ToppingSchema;