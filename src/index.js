import express from 'express';
import Routes from './catalogue/routes';
import { methodError, serverError } from './util'
import './db';
const app = express();

app
  .use(express.json())
  .use('/api/v1/', Routes)
  .use(methodError)
  .use(serverError);

app.listen(process.env.PORT || 3000);

export default app;
