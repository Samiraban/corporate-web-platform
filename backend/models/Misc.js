const mongoose = require('mongoose');

// --- Awards & Achievements (Section 10) ---
const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    year: { type: Number },
    description: { type: String },
    image: { type: String },
    relatedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// --- Clients / Partners (Section 10) ---
const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    website: { type: String, trim: true },
    type: { type: String, enum: ['client', 'partner'], default: 'client' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// --- Testimonials (Section 10) ---
const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    company: { type: String, trim: true },
    photo: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    testimonial: { type: String, required: true },
    relatedService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    video: { type: String },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// --- FAQs (Section 13) ---
const faqSchema = new mongoose.Schema(
  {
    category: { type: String, trim: true, default: 'General' },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// --- Site-wide settings (Section 14/17: menus, footer, announcement bar, popups, social links) ---
const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. 'general', 'announcementBar', 'socialLinks'
    value: { type: mongoose.Schema.Types.Mixed },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = {
  Award: mongoose.model('Award', awardSchema),
  Partner: mongoose.model('Partner', partnerSchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  FAQ: mongoose.model('FAQ', faqSchema),
  Settings: mongoose.model('Settings', settingsSchema),
};
