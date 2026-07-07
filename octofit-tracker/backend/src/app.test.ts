import assert from 'node:assert/strict';
import app from './app';

async function main() {
  const server = app.listen(0);

  const port = await new Promise<number>((resolve) => {
    server.once('listening', () => {
      const address = server.address();
      resolve(typeof address === 'object' && address ? address.port : 0);
    });
  });

  try {
    const healthResponse = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(healthResponse.status, 200);

    const usersResponse = await fetch(`http://127.0.0.1:${port}/api/users/`);
    assert.equal(usersResponse.status, 200);

    const teamsResponse = await fetch(`http://127.0.0.1:${port}/api/teams/`);
    assert.equal(teamsResponse.status, 200);

    const activitiesResponse = await fetch(`http://127.0.0.1:${port}/api/activities/`);
    assert.equal(activitiesResponse.status, 200);

    const leaderboardResponse = await fetch(`http://127.0.0.1:${port}/api/leaderboard/`);
    assert.equal(leaderboardResponse.status, 200);

    const workoutsResponse = await fetch(`http://127.0.0.1:${port}/api/workouts/`);
    assert.equal(workoutsResponse.status, 200);
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
