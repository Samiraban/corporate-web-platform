const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const Company = require('../models/Company');
const { ROLES } = require('../utils/constants');

const controller = buildCrudController(Company, {
  moduleName: 'Company',
  searchFields: ['name', 'tagline', 'overview'],
  populate: [{ path: 'services', select: 'title slug' }, { path: 'industries', select: 'name slug' }],
});

module.exports = buildRouter(controller, [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.CONTENT_MANAGER,
]);
