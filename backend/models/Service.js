const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');

const serviceCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, index: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
serviceCategorySchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const faqItemSchema = new mongoose.Schema(
  { question: String, answer: String },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
    icon: { type: String },
    image: { type: String },
    shortDescription: { type: String, maxlength: 300 },
    description: { type: String }, // rich text
    benefits: [{ type: String }],
    process: [{ step: String, description: String }],
    industries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Industry' }],
    relatedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    faqs: [faqItemSchema],
    ctaText: { type: String, default: 'Get in Touch' },
    ctaLink: { type: String, default: '/contact' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    order: { type: Number, default: 0 },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

serviceSchema.pre('validate', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

serviceSchema.index({ title: 'text', shortDescription: 'text' });

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);
const Service = mongoose.model('Service', serviceSchema);

module.exports = { Service, ServiceCategory };
