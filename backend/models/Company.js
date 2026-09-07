const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');

const branchSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true }, // e.g. "Head Office", "Pokhara Branch"
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    mapEmbedUrl: { type: String, trim: true },
    latitude: Number,
    longitude: Number,
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    tagline: { type: String, trim: true },
    logo: { type: String },
    coverImage: { type: String },
    overview: { type: String },
    history: { type: String },
    establishedYear: { type: Number },
    industryType: { type: String, trim: true },
    website: { type: String, trim: true },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      youtube: String,
      tiktok: String,
      x: String,
    },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    headquarters: { type: String, trim: true },
    branches: [branchSchema],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    industries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Industry' }],
    gallery: [{ url: String, caption: String }],
    certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    brochures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    order: { type: Number, default: 0 },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

companySchema.pre('validate', function generateSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

companySchema.index({ name: 'text', overview: 'text', tagline: 'text' });

module.exports = mongoose.model('Company', companySchema);
