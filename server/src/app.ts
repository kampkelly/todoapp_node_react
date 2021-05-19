/* eslint-disable @typescript-eslint/no-var-requires */
import { createConnection } from 'typeorm';

import app from './server';

const ormConfig = require('../ormconfig');

const port = process.env.PORT || 3001;
const { pid } = process;

const config = ormConfig;
createConnection(config);

app.listen(port, () => {
  console.log(`🚀 Server listening at port ${port} with PID ${pid}`);
});

process.on('unhandledRejection', (reason: any): void => {
  throw reason;
});

export default app;
