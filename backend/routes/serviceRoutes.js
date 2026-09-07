const express = require('express');
const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const { Service, ServiceCategory } = require('../models/Service');
const { ROLES } = require('../utils/constants');

const roles = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER, ROLES.EDITOR];

const serviceController = buildCrudController(Service, {
  moduleName: 'Service',
  searchFields: ['title', 'shortDescription'],
  populate: [{ path: 'category', select: 'name slug' }, { path: 'industries', select: 'name slug' }],
});

const categoryController = buildCrudController(ServiceCategory, {
  moduleName: 'ServiceCategory',
  searchFields: ['name'],
});

const router = express.Router();
router.use('/categories', buildRouter(categoryController, [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER]));
router.use('/', buildRouter(serviceController, roles));

module.exports = router;
