import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: Number,
  },
  { timestamps: true }
);

export default model('Leaderboard', leaderboardSchema);
