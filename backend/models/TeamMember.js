const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    isLeadership: { type: Boolean, default: false }, // true = shown on Leadership page
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // null = group-level
    photo: { type: String },
    biography: { type: String },
    experience: { type: String },
    responsibilities: [{ type: String }],
    education: [{ type: String }],
    socialLinks: {
      linkedin: String,
      twitter: String,
      email: String,
    },
    reportsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' }, // for org chart
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
