import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: String,
    durationMinutes: Number,
    difficulty: String,
    focus: String,
    recommendedFor: [{ type: String }],
  },
  { timestamps: true }
);

export default model('Workout', workoutSchema);
