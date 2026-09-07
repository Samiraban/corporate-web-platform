const express = require('express');
const documentController = require('../controllers/documentController');
const { protect, authorize } = require('../middleware/auth');
const { uploadDocument } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

const router = express.Router();
const writeGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER)];

router.get('/', documentController.getAll);
router.get('/:id', documentController.getOne);
router.get('/:id/download', documentController.trackDownload);
router.post('/', ...writeGuard, uploadDocument.single('file'), documentController.createOne);
router.put('/:id', ...writeGuard, uploadDocument.single('file'), documentController.updateOne);
router.delete('/:id', ...writeGuard, documentController.deleteOne);

module.exports = router;
