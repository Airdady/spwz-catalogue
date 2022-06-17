import express from 'express';
import Controller from './controller';
import { Validate } from './middleware'


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

router.delete(
  '/catalogue/:id',
  Controller.delete
);

export default router;