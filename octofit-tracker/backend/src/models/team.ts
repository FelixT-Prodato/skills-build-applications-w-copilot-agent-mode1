import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    focus: String,
  },
  { timestamps: true }
);

export default model('Team', teamSchema);
