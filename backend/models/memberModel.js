import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MemberSchema = new Schema ({
  pointsSpent: { type: Number, required: true },
});

export default MemberSchema;