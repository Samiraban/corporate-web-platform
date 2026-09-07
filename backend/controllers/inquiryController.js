const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { Inquiry, Newsletter } = require('../models/Inquiry');
const escapeRegex = require('../utils/escapeRegex');
const sendEmail = require('../utils/sendEmail');
const logAudit = require('../utils/logAudit');

// @desc  Public: submit contact or business inquiry form
// @route POST /api/inquiries
const createInquiry = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (req.file) {
    payload.attachment = { url: `/uploads/documents/${req.file.filename}`, originalName: req.file.originalname };
  }

  const inquiry = await Inquiry.create(payload);

  // Notify internal team
  sendEmail({
    to: process.env.NOTIFY_EMAIL,
    subject: `New ${inquiry.type} inquiry [${inquiry.referenceNumber}]`,
    text: `From: ${inquiry.name} (${inquiry.email})\nSubject: ${inquiry.subject || '-'}\n\n${inquiry.message}`,
  }).catch((err) => console.error('Notify email failed:', err.message));

  // Confirm to the submitter
  sendEmail({
    to: inquiry.email,
    subject: `We received your message — Ref ${inquiry.referenceNumber}`,
    text: `Hi ${inquiry.name}, thank you for reaching out to OS GROUP OF COMPANY. Your reference number is ${inquiry.referenceNumber}. We'll get back to you shortly.`,
  }).catch((err) => console.error('Confirmation email failed:', err.message));

  res.status(201).json({
    success: true,
    message: 'Your message has been received.',
    referenceNumber: inquiry.referenceNumber,
  });
});

// @desc  Admin: list all inquiries
// @route GET /api/inquiries
const getInquiries = asyncHandler(async (req, res) => {
  const { type, status, search, page = 1, limit = 20 } = req.query;
  const query = {};
  if (type) query.type = type;
  if (status) query.status = status;
  if (search) {
    const safeSearch = escapeRegex(search);
    query.$or = [
      { name: { $regex: safeSearch, $options: 'i' } },
      { email: { $regex: safeSearch, $options: 'i' } },
      { referenceNumber: { $regex: safeSearch, $options: 'i' } },
    ];
  }
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, parseInt(limit, 10));

  const [items, total] = await Promise.all([
    Inquiry.find(query).sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum),
    Inquiry.countDocuments(query),
  ]);
  res.json({ success: true, count: items.length, total, page: pageNum, data: items });
});

const updateInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!inquiry) throw new ApiError(404, 'Inquiry not found');
  await logAudit({ req, action: 'UPDATE', module: 'Inquiry', targetId: inquiry._id, description: `Updated inquiry ${inquiry.referenceNumber}` });
  res.json({ success: true, data: inquiry });
});

// ---------- Newsletter ----------

const subscribe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!email) throw new ApiError(400, 'Email is required');
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await Newsletter.findOne({ email: normalizedEmail });
  if (existing) {
    if (!existing.isSubscribed) {
      existing.isSubscribed = true;
      await existing.save();
    }
    return res.json({ success: true, message: 'You are subscribed.' });
  }

  await Newsletter.create({ name, email: normalizedEmail });
  res.status(201).json({ success: true, message: 'Subscribed successfully.' });
});

const unsubscribe = asyncHandler(async (req, res) => {
  if (!req.body.email) throw new ApiError(400, 'Email is required');
  const sub = await Newsletter.findOneAndUpdate(
    { email: req.body.email.trim().toLowerCase() },
    { isSubscribed: false },
    { new: true }
  );
  if (!sub) throw new ApiError(404, 'Subscriber not found');
  res.json({ success: true, message: 'Unsubscribed successfully.' });
});

const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.find({ isSubscribed: true }).sort('-createdAt');
  res.json({ success: true, count: subscribers.length, data: subscribers });
});

module.exports = { createInquiry, getInquiries, updateInquiry, subscribe, unsubscribe, getSubscribers };
