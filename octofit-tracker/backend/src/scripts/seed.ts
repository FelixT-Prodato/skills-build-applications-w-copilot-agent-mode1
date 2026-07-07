import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        age: 29,
        goal: 'Build endurance',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Marcus Lee',
        email: 'marcus@example.com',
        age: 34,
        goal: 'Increase strength',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Sofia Patel',
        email: 'sofia@example.com',
        age: 27,
        goal: 'Improve mobility',
        fitnessLevel: 'beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Harbor Hustlers',
        captain: 'Ava Chen',
        members: ['Ava Chen', 'Marcus Lee'],
        focus: 'Endurance challenges',
      },
      {
        name: 'Peak Pioneers',
        captain: 'Sofia Patel',
        members: ['Sofia Patel', 'Mina Ortiz'],
        focus: 'Strength training',
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        distanceKm: 5.2,
        date: new Date('2026-07-02'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 510,
        distanceKm: 0,
        date: new Date('2026-07-03'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        distanceKm: 0,
        date: new Date('2026-07-04'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        score: 980,
        rank: 1,
        streak: 6,
      },
      {
        userId: users[1]._id,
        score: 945,
        rank: 2,
        streak: 4,
      },
      {
        userId: users[2]._id,
        score: 890,
        rank: 3,
        streak: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run',
        category: 'Cardio',
        durationMinutes: 40,
        difficulty: 'Intermediate',
        focus: 'Interval pacing',
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'Full Body Strength',
        category: 'Strength',
        durationMinutes: 45,
        difficulty: 'Advanced',
        focus: 'Compound lifts',
        recommendedFor: ['advanced'],
      },
      {
        title: 'Mobility Flow',
        category: 'Recovery',
        durationMinutes: 25,
        difficulty: 'Beginner',
        focus: 'Flexibility',
        recommendedFor: ['beginner', 'intermediate'],
      },
    ]);

    console.log('Seed data inserted successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
