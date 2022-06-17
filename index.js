const express = require('express');
const Routes = require('./src/catalogue/routes');
const { methodError, serverError } = require('./src/utils/util')
require('./src/db');

const app = express();

app.use(express.json())
  .use('/api/v1/', Routes)
  .use(methodError)
  .use(serverError);

app.listen(process.env.PORT || 3000);

module.exports =  app;
