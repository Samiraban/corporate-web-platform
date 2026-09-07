const express = require('express');
const mediaController = require('../controllers/mediaController');
const { protect, authorize } = require('../middleware/auth');
const { uploadMedia } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

const router = express.Router();
const writeGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CONTENT_MANAGER, ROLES.EDITOR)];

// Asset library
router.get('/assets', mediaController.getAssets);
router.post('/assets', ...writeGuard, uploadMedia.single('file'), mediaController.uploadAsset);
router.put('/assets/:id', ...writeGuard, mediaController.updateAsset);
router.delete('/assets/:id', ...writeGuard, mediaController.deleteAsset);

// Albums (galleries)
router.get('/albums', mediaController.getAlbums);
router.get('/albums/:id', mediaController.getAlbum);
router.post('/albums', ...writeGuard, mediaController.createAlbum);
router.put('/albums/:id', ...writeGuard, mediaController.updateAlbum);
router.delete('/albums/:id', ...writeGuard, mediaController.deleteAlbum);

module.exports = router;
