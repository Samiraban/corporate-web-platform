const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');
const { PROJECT_STATUS } = require('../utils/constants');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    client: { type: String, trim: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    category: { type: String, trim: true },
    industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    location: { type: String, trim: true },
    startDate: { type: Date },
    completionDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.ONGOING,
    },
    isFeatured: { type: Boolean, default: false },
    description: { type: String },
    objectives: [{ type: String }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    technologies: [{ type: String }],
    projectUrl: { type: String, trim: true },
    coverImage: { type: String },
    gallery: [{ url: String, caption: String }],
    video: { type: String },
    challenge: { type: String },
    solution: { type: String },
    implementation: { type: String },
    results: { type: String },
    testimonial: {
      clientName: String,
      designation: String,
      photo: String,
      quote: String,
      rating: { type: Number, min: 1, max: 5 },
    },
    relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    publishStatus: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    order: { type: Number, default: 0 },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

projectSchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ name: 'text', client: 'text', description: 'text' });
projectSchema.index({ status: 1, industry: 1, company: 1, location: 1 });

module.exports = mongoose.model('Project', projectSchema);
