const AuditLog = require('../models/AuditLog');

/**
 * Records an administrative action. Never throws — a logging failure
 * should never break the actual request.
 */
const logAudit = async ({ req, action, module, targetId, description, metadata }) => {
  try {
    await AuditLog.create({
      user: req.user?._id,
      userName: req.user?.name,
      userRole: req.user?.role,
      action,
      module,
      targetId,
      description,
      ipAddress: req.ip,
      metadata,
    });
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
};

module.exports = logAudit;
