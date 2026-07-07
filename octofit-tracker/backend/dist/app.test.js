"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const app_1 = __importDefault(require("./app"));
async function main() {
    const server = app_1.default.listen(0);
    const port = await new Promise((resolve) => {
        server.once('listening', () => {
            const address = server.address();
            resolve(typeof address === 'object' && address ? address.port : 0);
        });
    });
    try {
        const healthResponse = await fetch(`http://127.0.0.1:${port}/api/health`);
        strict_1.default.equal(healthResponse.status, 200);
        const usersResponse = await fetch(`http://127.0.0.1:${port}/api/users/`);
        strict_1.default.equal(usersResponse.status, 200);
        const teamsResponse = await fetch(`http://127.0.0.1:${port}/api/teams/`);
        strict_1.default.equal(teamsResponse.status, 200);
        const activitiesResponse = await fetch(`http://127.0.0.1:${port}/api/activities/`);
        strict_1.default.equal(activitiesResponse.status, 200);
        const leaderboardResponse = await fetch(`http://127.0.0.1:${port}/api/leaderboard/`);
        strict_1.default.equal(leaderboardResponse.status, 200);
        const workoutsResponse = await fetch(`http://127.0.0.1:${port}/api/workouts/`);
        strict_1.default.equal(workoutsResponse.status, 200);
    }
    finally {
        server.close();
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
