const express = require('express');
const Controller = require('./controller');
const { Validate } = require('./middleware');


const router = express.Router();

router.get('/catalogue', Controller.getAll);

router.post(
  '/catalogue',
  Validate,
  Controller.createOne
);

router.patch(
  '/catalogue/:id',
  Validate,
  Controller.update
);

router.get(
  '/catalogue/:id',
  Controller.getOne
);

router.delete(
  '/catalogue/:id',
  Controller.delete
);

module.exports = router;