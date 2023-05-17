import mongoose from 'mongoose';
import config from 'config';

import logger from './logger';

// function connect() {
//   const dbUri = config.get<string>('dbUri');

//   return mongoose
//     .connect(dbUri)
//     .then(() => {
//       console.log('Connected to DB');
//     })
//     .catch(error => {
//       console.error('Could not connect to DB');
//       process.exit(1);
//     });
// }

async function connect() {
  const dbUri = config.get<string>('dbUri');
  try {
    await mongoose.connect(dbUri);
    logger.info('DB to connected');
  } catch (error) {
    logger.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connect;
