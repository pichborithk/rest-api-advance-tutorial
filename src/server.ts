import express from 'express';
import config from 'config';

import connect from './utils/connect';
import logger from './utils/logger';

const port = config.get<number>('port');

const server = express();

server.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();
});
