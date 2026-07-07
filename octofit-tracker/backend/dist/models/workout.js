"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: String,
    durationMinutes: Number,
    difficulty: String,
    focus: String,
    recommendedFor: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
