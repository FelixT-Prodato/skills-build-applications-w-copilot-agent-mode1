import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    goal: String,
    fitnessLevel: String,
  },
  { timestamps: true }
);

export default model('User', userSchema);
