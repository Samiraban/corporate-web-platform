const express = require('express');
const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const { Blog, BlogCategory } = require('../models/Blog');
const { ROLES } = require('../utils/constants');

const roles = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER, ROLES.EDITOR];

const blogController = buildCrudController(Blog, {
  moduleName: 'Blog',
  searchFields: ['title', 'excerpt', 'content', 'tags'],
  populate: [{ path: 'category', select: 'name slug' }, { path: 'author', select: 'name avatar' }],
});

const categoryController = buildCrudController(BlogCategory, {
  moduleName: 'BlogCategory',
  searchFields: ['name'],
});

const router = express.Router();
router.use('/categories', buildRouter(categoryController, [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER]));
router.use('/', buildRouter(blogController, roles));

module.exports = router;
