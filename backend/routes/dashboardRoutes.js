const express = require('express');
const { getStats, getAuditLogs } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

const router = express.Router();
router.use(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER, ROLES.HR, ROLES.EDITOR));

router.get('/stats', getStats);
router.get('/audit-logs', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getAuditLogs);

module.exports = router;
