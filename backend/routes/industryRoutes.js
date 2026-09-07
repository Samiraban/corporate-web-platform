const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const Industry = require('../models/Industry');
const { ROLES } = require('../utils/constants');

const controller = buildCrudController(Industry, {
  moduleName: 'Industry',
  searchFields: ['name', 'description'],
});

module.exports = buildRouter(controller, [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER]);
