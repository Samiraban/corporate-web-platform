const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const TeamMember = require('../models/TeamMember');
const { ROLES } = require('../utils/constants');

const controller = buildCrudController(TeamMember, {
  moduleName: 'TeamMember',
  searchFields: ['name', 'designation'],
  populate: [{ path: 'company', select: 'name slug' }, { path: 'reportsTo', select: 'name designation' }],
});

module.exports = buildRouter(controller, [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER]);
