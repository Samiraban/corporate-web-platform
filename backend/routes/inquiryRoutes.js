const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');
const { uploadDocument } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

const router = express.Router();
const staffGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER)];

// Contact / business inquiry form (public)
router.post('/', uploadDocument.single('attachment'), inquiryController.createInquiry);
router.get('/', ...staffGuard, inquiryController.getInquiries);
router.put('/:id', ...staffGuard, inquiryController.updateInquiry);

module.exports = router;
