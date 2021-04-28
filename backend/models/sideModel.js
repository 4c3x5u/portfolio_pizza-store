import mongoose from 'mongoose';

const { Schema } = mongoose;

const SideSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
});

export default SideSchema;
