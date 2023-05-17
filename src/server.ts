import express from 'express';
import config from 'config';

import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

const port = config.get<number>('port');

const server = express();

server.use(express.json());

server.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();

  routes(server);
});
