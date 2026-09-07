const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const News = require('../models/News');
const { ROLES } = require('../utils/constants');

const controller = buildCrudController(News, {
  moduleName: 'News',
  searchFields: ['title', 'excerpt', 'content'],
  populate: [{ path: 'company', select: 'name slug logo' }],
});

module.exports = buildRouter(controller, [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.CONTENT_MANAGER,
  ROLES.EDITOR,
]);
