import express from 'express';
import Routes from './catalogue/routes.js';
import { methodError, serverError } from './util.js'
import './db.js';
const app = express();

app
  .use(express.json())
  .use('/api/orders', Routes)
  .use(methodError)
  .use(serverError);

app.listen(process.env.PORT || 3000);

export default app;
