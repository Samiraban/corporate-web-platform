const path = require('path');
const fs = require('fs/promises');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const escapeRegex = require('../utils/escapeRegex');
const Document = require('../models/Document');
const logAudit = require('../utils/logAudit');

// Best-effort removal of an uploaded file from disk given its public URL.
// Never throws — a missing file on disk shouldn't block the DB delete.
const removeUploadedFile = async (url) => {
  if (!url || !url.startsWith('/uploads/')) return;
  try {
    await fs.unlink(path.join(__dirname, '..', url));
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Failed to remove uploaded file:', url, err.message);
  }
};

const getAll = asyncHandler(async (req, res) => {
  const { category, visibility, search, page = 1, limit = 20 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (visibility) query.visibility = visibility;
  if (search) query.title = { $regex: escapeRegex(search), $options: 'i' };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, parseInt(limit, 10));

  const [items, total] = await Promise.all([
    Document.find(query)
      .populate('relatedCompany', 'name slug logo')
      .sort('-createdAt')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Document.countDocuments(query),
  ]);

  res.json({ success: true, count: items.length, total, page: pageNum, data: items });
});

const getOne = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id).populate('relatedCompany', 'name slug');
  if (!doc) throw new ApiError(404, 'Document not found');
  res.json({ success: true, data: doc });
});

// @desc  Upload a new document (multipart/form-data, field name: file)
const createOne = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'A file is required');

  const doc = await Document.create({
    ...req.body,
    file: {
      url: `/uploads/documents/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
    },
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  await logAudit({ req, action: 'CREATE', module: 'Document', targetId: doc._id, description: `Uploaded document "${doc.title}"` });
  res.status(201).json({ success: true, data: doc });
});

// @desc  Replace file (keeps old file in versions[]) and/or update metadata
const updateOne = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) throw new ApiError(404, 'Document not found');

  Object.assign(doc, req.body);
  doc.updatedBy = req.user._id;

  if (req.file) {
    doc.versions.push({
      url: doc.file.url,
      originalName: doc.file.originalName,
      uploadedBy: req.user._id,
    });
    doc.file = {
      url: `/uploads/documents/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
    };
  }

  await doc.save();
  await logAudit({ req, action: 'UPDATE', module: 'Document', targetId: doc._id, description: `Updated document "${doc.title}"` });
  res.json({ success: true, data: doc });
});

const deleteOne = asyncHandler(async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, 'Document not found');
  await removeUploadedFile(doc.file?.url);
  await Promise.all((doc.versions || []).map((v) => removeUploadedFile(v.url)));
  await logAudit({ req, action: 'DELETE', module: 'Document', targetId: req.params.id, description: `Deleted document "${doc.title}"` });
  res.json({ success: true, data: {} });
});

// @desc  Track a download and redirect/serve — increments counter
const trackDownload = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) throw new ApiError(404, 'Document not found');
  if (doc.visibility === 'private') {
    throw new ApiError(403, 'This document is private');
  }
  doc.downloadCount += 1;
  await doc.save();
  res.json({ success: true, url: doc.file.url, fileName: doc.file.originalName });
});

module.exports = { getAll, getOne, createOne, updateOne, deleteOne, trackDownload };
