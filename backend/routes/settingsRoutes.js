const express = require('express');
const { getSettings, updateSetting } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.get('/', getSettings);
router.get('/:key', getSettings);
router.put('/:key', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), updateSetting);

module.exports = router;
