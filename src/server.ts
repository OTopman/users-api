import http from 'http';
import app from './app';
import logger from './Helpers/logger';
import config from '@config';
const PORT = config.app.port || 8000;
const HOST = config.app.host || 'localhost';

const server = http.createServer(app);

server.listen(PORT, async () => {
  logger.info(`App listening on: http://${HOST}:${PORT}`);
});

server.on('error', handleStartError);

// Handle unhandledRejection error
process.on('unhandledRejection', (err: Error) => {
  logger.error(err.message, err);
  logger.info('UNHANDLED REJECTION. Shutting down...❌');
  // Close connection gracefully
  logger.exitOnError = true;
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaughtException error
process.on('uncaughtException', (err: Error) => {
  logger.error(err.name, err);
  logger.info('UNCAUGHT EXCEPTION. Shutting down...❌');
  // Close connection gracefully
  logger.exitOnError = true;
  server.close(() => {
    process.exit(1);
  });
});

// eslint-disable-next-line require-jsdoc
function handleStartError(err: Error) {
  logger.error(err.message, err);
}

export default server;
