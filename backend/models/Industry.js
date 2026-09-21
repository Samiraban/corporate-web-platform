const mongoose = require('mongoose');
const slugify = require('slugify');

const seoSchema = require('./schemas/seoSchema');

const industrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
      default: '',
    },

    image: {
      type: String,
      trim: true,
      default: '',
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },

    order: {
      type: Number,
      default: 0,
      index: true,
    },

    seo: {
      type: seoSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

/*
 * Automatically generate the slug from the industry name.
 */
industrySchema.pre('validate', function (next) {
  if (
    this.name &&
    (!this.slug || this.isModified('name'))
  ) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

module.exports = mongoose.model(
  'Industry',
  industrySchema
);