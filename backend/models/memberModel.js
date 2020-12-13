import mongoose from 'mongoose';

const { Schema } = mongoose;

const MemberSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pointsSpent: { type: Number, required: true },
});

export default MemberSchema;
