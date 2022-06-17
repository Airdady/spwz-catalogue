import express from 'express';
import Controller from './controller';


const router = express.Router();

router.get('/catalogue', Controller.getAll);

// router.get(
//   '/catalogue/:slug',
//   CatalogueMiddleware.getCatBySlug,
//   CatalogueMiddleware.checkCatalogueExists,
//   ProductController.getPrdctsByCat
// );

router.post(
  '/catalogue',
  verifyToken,
  ValidateCatalogue,
  checkParentBodyExists,
  Controller.createOne
);

// router.patch(
//   '/catalogue/:id',
//   UserMiddleware.verifyToken,
//   CatalogueMiddleware.checkCatalogueExist,
//   CatalogueMiddleware.checkParentExists,
//   UserMiddleware.checkRole,
//   ValidateCatalogue,
//   CatalogueController.update
// );

// router.delete(
//   '/catalogue/:id',
//   UserMiddleware.verifyToken,
//   CatalogueMiddleware.checkCatalogueExist,
//   UserMiddleware.checkRole,
//   CatalogueController.delete
// );

export default router;