const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');
const { CONTENT_STATUS } = require('../utils/constants');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    type: {
      type: String,
      enum: ['announcement', 'launch', 'project', 'partnership', 'event', 'achievement', 'press_release'],
      default: 'announcement',
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    coverImage: { type: String },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true },
    eventDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(CONTENT_STATUS),
      default: CONTENT_STATUS.DRAFT,
    },
    scheduledAt: { type: Date },
    publishedAt: { type: Date },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

newsSchema.pre('validate', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

newsSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

module.exports = mongoose.model('News', newsSchema);
