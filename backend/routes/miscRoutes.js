const express = require('express');
const buildCrudController = require('../controllers/factory');
const buildRouter = require('./routeFactory');
const { Award, Partner, Testimonial, FAQ } = require('../models/Misc');
const { ROLES } = require('../utils/constants');

const roles = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER];

const awardController = buildCrudController(Award, { moduleName: 'Award', searchFields: ['title', 'organization'] });
const partnerController = buildCrudController(Partner, { moduleName: 'Partner', searchFields: ['name'] });
const testimonialController = buildCrudController(Testimonial, {
  moduleName: 'Testimonial',
  searchFields: ['clientName', 'company', 'testimonial'],
});
const faqController = buildCrudController(FAQ, { moduleName: 'FAQ', searchFields: ['question', 'answer'] });

const router = express.Router();
router.use('/awards', buildRouter(awardController, roles));
router.use('/partners', buildRouter(partnerController, roles));
router.use('/testimonials', buildRouter(testimonialController, roles));
router.use('/faqs', buildRouter(faqController, roles));

module.exports = router;
