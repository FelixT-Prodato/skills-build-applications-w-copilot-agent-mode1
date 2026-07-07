import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find({}).populate('userId').lean();
  res.json({ route: '/api/leaderboard', items: entries });
});

export default router;
