import express from 'express';
import Controller from './controller.js';
import { Validate } from './middleware.js'


const router = express.Router();

router.get('/',
  Controller.fetchOrders
);

router.post(
  '/',
  Controller.createOne
);

router.patch(
  '/update/:id',
  Controller.update
);

router.patch(
  '/update/status/:id',
  Controller.statusUpdate
);


router.delete(
  '/delete/:id',
  Controller.delete
);

export default router;