const mongoose = require('mongoose');

// Embedded on every indexable content type (Section 14: SEO, Analytics
// & Social Integration).
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true, maxlength: 70 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    keywords: [{ type: String, trim: true }],
    canonicalUrl: { type: String, trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false }
);

module.exports = seoSchema;
