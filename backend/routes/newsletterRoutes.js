const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

const router = express.Router();
const staffGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER)];

router.post('/subscribe', inquiryController.subscribe);
router.post('/unsubscribe', inquiryController.unsubscribe);
router.get('/subscribers', ...staffGuard, inquiryController.getSubscribers);

module.exports = router;
