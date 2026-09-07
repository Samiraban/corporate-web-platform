const mongoose = require('mongoose');

// Every important administrative action is recorded here per Section 16:
// "Every important administrative action should record user, action and
// date/time in an Audit Log."
const auditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String },
    userRole: { type: String },
    action: { type: String, required: true }, // e.g. 'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'LOGIN'
    module: { type: String, required: true }, // e.g. 'Company', 'Service', 'User'
    targetId: { type: mongoose.Schema.Types.ObjectId },
    description: { type: String },
    ipAddress: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

auditLogSchema.index({ module: 1, createdAt: -1 });
auditLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
