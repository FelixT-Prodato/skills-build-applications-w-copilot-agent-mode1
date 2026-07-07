import app, { connectDatabase, getApiBaseUrl } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function startServer() {
  try {
    await connectDatabase(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, '0.0.0.0', () => {
      const codespaceName = process.env.CODESPACE_NAME;
      const serverUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`;

      console.log(`API server listening on ${serverUrl}`);
      console.log(`Codespaces-aware base URL: ${getApiBaseUrl()}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
