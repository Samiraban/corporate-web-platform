const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');

const industrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, index: true },
    icon: { type: String },
    image: { type: String },
    description: { type: String },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    order: { type: Number, default: 0 },
    seo: seoSchema,
  },
  { timestamps: true }
);

industrySchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Industry', industrySchema);
