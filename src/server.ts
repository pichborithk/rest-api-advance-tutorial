import express from 'express';
import config from 'config';

import connect from './utils/connect';

const port = config.get<number>('port');

const server = express();

server.listen(port, async () => {
  console.log('Server is running');

  await connect();
});
