const path = require('path');
const fs = require('fs/promises');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { MediaAsset, Album } = require('../models/Media');
const escapeRegex = require('../utils/escapeRegex');
const logAudit = require('../utils/logAudit');

// Best-effort removal of an uploaded file from disk given its public URL
// (e.g. '/uploads/media/xyz.jpg'). Never throws — a missing file on disk
// shouldn't block the DB record from being deleted.
const removeUploadedFile = async (url) => {
  if (!url || !url.startsWith('/uploads/')) return;
  try {
    await fs.unlink(path.join(__dirname, '..', url));
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Failed to remove uploaded file:', url, err.message);
  }
};

// ---------- Media library assets ----------

const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'A file is required');
  const type = req.file.mimetype.startsWith('video') ? 'video' : 'image';

  const asset = await MediaAsset.create({
    url: `/uploads/media/${req.file.filename}`,
    type,
    originalName: req.file.originalname,
    altText: req.body.altText || '',
    caption: req.body.caption || '',
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    uploadedBy: req.user._id,
  });

  res.status(201).json({ success: true, data: asset });
});

const getAssets = asyncHandler(async (req, res) => {
  const { type, search, page = 1, limit = 40 } = req.query;
  const query = {};
  if (type) query.type = type;
  if (search) query.originalName = { $regex: escapeRegex(search), $options: 'i' };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(200, parseInt(limit, 10));

  const [items, total] = await Promise.all([
    MediaAsset.find(query).sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum),
    MediaAsset.countDocuments(query),
  ]);
  res.json({ success: true, count: items.length, total, data: items });
});

const updateAsset = asyncHandler(async (req, res) => {
  const asset = await MediaAsset.findByIdAndUpdate(
    req.params.id,
    { altText: req.body.altText, caption: req.body.caption },
    { new: true }
  );
  if (!asset) throw new ApiError(404, 'Asset not found');
  res.json({ success: true, data: asset });
});

const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await MediaAsset.findByIdAndDelete(req.params.id);
  if (!asset) throw new ApiError(404, 'Asset not found');
  await removeUploadedFile(asset.url);
  await logAudit({ req, action: 'DELETE', module: 'MediaAsset', targetId: req.params.id, description: 'Deleted media asset' });
  res.json({ success: true, data: {} });
});

// ---------- Albums ----------

const getAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find().sort('-createdAt');
  res.json({ success: true, count: albums.length, data: albums });
});

const getAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) throw new ApiError(404, 'Album not found');
  res.json({ success: true, data: album });
});

const createAlbum = asyncHandler(async (req, res) => {
  const album = await Album.create(req.body);
  await logAudit({ req, action: 'CREATE', module: 'Album', targetId: album._id, description: `Created album "${album.title}"` });
  res.status(201).json({ success: true, data: album });
});

const updateAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!album) throw new ApiError(404, 'Album not found');
  res.json({ success: true, data: album });
});

const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  if (!album) throw new ApiError(404, 'Album not found');
  await logAudit({ req, action: 'DELETE', module: 'Album', targetId: req.params.id, description: `Deleted album "${album.title}"` });
  res.json({ success: true, data: {} });
});

module.exports = {
  uploadAsset, getAssets, updateAsset, deleteAsset,
  getAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum,
};
