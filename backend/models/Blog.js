const mongoose = require('mongoose');
const slugify = require('slugify');
const seoSchema = require('./schemas/seoSchema');
const { CONTENT_STATUS } = require('../utils/constants');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' },
    tags: [{ type: String, trim: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverImage: { type: String },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true }, // rich text / HTML from editor
    isFeatured: { type: Boolean, default: false },
    readingTimeMinutes: { type: Number },
    relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    status: {
      type: String,
      enum: Object.values(CONTENT_STATUS),
      default: CONTENT_STATUS.DRAFT,
    },
    scheduledAt: { type: Date },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    seo: seoSchema,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

blogSchema.pre('validate', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.content && this.isModified('content')) {
    const words = this.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    this.readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  }
  next();
});

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

const blogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);
blogCategorySchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

module.exports = { Blog, BlogCategory };
