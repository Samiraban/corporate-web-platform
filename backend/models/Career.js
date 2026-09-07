const mongoose = require('mongoose');
const slugify = require('slugify');
const { JOB_STATUS, APPLICATION_STATUS } = require('../utils/constants');

const jobSchema = new mongoose.Schema(
  {
    position: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    department: { type: String, trim: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    location: { type: String, trim: true },
    employmentType: {
      type: String,
      enum: ['full_time', 'part_time', 'contract', 'internship', 'remote'],
      default: 'full_time',
    },
    experience: { type: String, trim: true },
    salary: { type: String, trim: true }, // free text, e.g. "Negotiable" / "NPR 40k-60k"
    deadline: { type: Date },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    skills: [{ type: String }],
    benefits: [{ type: String }],
    status: { type: String, enum: Object.values(JOB_STATUS), default: JOB_STATUS.DRAFT },
    vacancies: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

jobSchema.pre('validate', function (next) {
  if (this.position && (!this.slug || this.isModified('position'))) {
    this.slug = `${slugify(this.position, { lower: true, strict: true })}-${Date.now().toString().slice(-5)}`;
  }
  next();
});

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    coverLetter: { type: String },
    cv: {
      url: { type: String, required: true },
      originalName: String,
    },
    portfolioLink: { type: String, trim: true },
    linkedinLink: { type: String, trim: true },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.RECEIVED,
    },
    notes: { type: String }, // internal HR notes
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);

module.exports = { Job, Application };
