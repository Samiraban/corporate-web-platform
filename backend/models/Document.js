const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        'registration', 'pan_vat', 'license', 'certificate', 'award',
        'company_profile', 'brochure', 'annual_report', 'policy',
        'service_document', 'project_document', 'presentation', 'other',
      ],
      default: 'other',
    },
    description: { type: String },
    documentNumber: { type: String, trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    relatedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    file: {
      url: { type: String, required: true },
      originalName: { type: String },
      mimeType: { type: String },
      sizeBytes: { type: Number },
    },
    // Version history — each entry is a previously uploaded file
    versions: [
      {
        url: String,
        originalName: String,
        uploadedAt: { type: Date, default: Date.now },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    downloadCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

documentSchema.index({ title: 'text', description: 'text' });
documentSchema.index({ category: 1, visibility: 1 });

module.exports = mongoose.model('Document', documentSchema);
