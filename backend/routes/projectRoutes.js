const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const Project = require('../models/Project');
const { ROLES } = require('../utils/constants');

const controller = buildCrudController(Project, {
  moduleName: 'Project',
  searchFields: ['name', 'client', 'description'],
  populate: [
    { path: 'company', select: 'name slug logo' },
    { path: 'industry', select: 'name slug' },
    { path: 'services', select: 'title slug' },
  ],
});

module.exports = buildRouter(controller, [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.CONTENT_MANAGER,
  ROLES.EDITOR,
]);
