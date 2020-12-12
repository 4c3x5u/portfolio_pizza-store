import mongoose from 'mongoose';

const { Schema } = mongoose;

const MemberSchema = new Schema({
  pointsSpent: { type: Number, required: true },
});

export default MemberSchema;
