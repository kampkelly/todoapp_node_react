import 'dotenv/config';
import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;
