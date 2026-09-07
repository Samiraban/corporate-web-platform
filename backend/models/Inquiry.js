const mongoose = require('mongoose');
const { INQUIRY_STATUS } = require('../utils/constants');

const inquirySchema = new mongoose.Schema(
  {
    referenceNumber: { type: String, unique: true, index: true },
    type: { type: String, enum: ['contact', 'business'], default: 'contact' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    subject: { type: String, trim: true },
    // business inquiry specific fields
    country: { type: String, trim: true },
    industry: { type: String, trim: true },
    requiredService: { type: String, trim: true },
    budget: { type: String, trim: true },
    message: { type: String, required: true },
    attachment: {
      url: String,
      originalName: String,
    },
    status: { type: String, enum: Object.values(INQUIRY_STATUS), default: INQUIRY_STATUS.NEW },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internalNotes: { type: String },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

inquirySchema.pre('validate', function (next) {
  if (!this.referenceNumber) {
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.referenceNumber = `OSG-${Date.now().toString().slice(-6)}-${rand}`;
  }
  next();
});

const newsletterSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    isSubscribed: { type: Boolean, default: true },
    unsubscribeToken: { type: String, select: false },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = { Inquiry, Newsletter };
