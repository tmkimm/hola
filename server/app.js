import config from './config/index.js';
import express from 'express';
import logger from './loaders/logger.js';
import loaders from './loaders/index.js';
function startServer() {
  const app = express();
  
  loaders(app);

  app.listen(config.port, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    logger.error(err);
    process.exit(1);
  });
};

startServer();
