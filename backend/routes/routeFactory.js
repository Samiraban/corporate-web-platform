const express = require('express');
const { protect, authorize } = require('../middleware/auth');

/**
 * Builds a router with:
 *   GET    /            (public)
 *   GET    /:id         (public)
 *   GET    /slug/:slug  (public, only if controller.getBySlug exists)
 *   POST   /            (protected, role-restricted)
 *   PUT    /:id         (protected, role-restricted)
 *   DELETE /:id         (protected, role-restricted)
 *   PUT    /reorder/bulk (protected, role-restricted, if controller.reorder exists)
 */
const buildRouter = (controller, allowedRoles = []) => {
  const router = express.Router();
  const writeGuard = [protect, authorize(...allowedRoles)];

  if (controller.reorder) {
    router.put('/reorder/bulk', ...writeGuard, controller.reorder);
  }
  if (controller.getBySlug) {
    router.get('/slug/:slug', controller.getBySlug);
  }

  router.get('/', controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/', ...writeGuard, controller.createOne);
  router.put('/:id', ...writeGuard, controller.updateOne);
  router.delete('/:id', ...writeGuard, controller.deleteOne);

  return router;
};

module.exports = buildRouter;
