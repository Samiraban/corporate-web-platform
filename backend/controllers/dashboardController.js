const asyncHandler = require('../utils/asyncHandler');
const Company = require('../models/Company');
const { Service } = require('../models/Service');
const Project = require('../models/Project');
const { Blog } = require('../models/Blog');
const News = require('../models/News');
const Document = require('../models/Document');
const { Job, Application } = require('../models/Career');
const { Inquiry } = require('../models/Inquiry');
const { Newsletter } = require('../models/Inquiry');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// @desc  Admin dashboard summary counts — powers the "Group statistics"
//        and admin overview widgets (Sections 3 & 15)
// @route GET /api/dashboard/stats
const getStats = asyncHandler(async (req, res) => {
  const [
    companies, services, projects, blogs, news, documents,
    openJobs, newApplications, newInquiries, subscribers, adminUsers,
  ] = await Promise.all([
    Company.countDocuments({ status: 'published' }),
    Service.countDocuments({ status: 'published' }),
    Project.countDocuments(),
    Blog.countDocuments({ status: 'published' }),
    News.countDocuments({ status: 'published' }),
    Document.countDocuments(),
    Job.countDocuments({ status: 'open' }),
    Application.countDocuments({ status: 'received' }),
    Inquiry.countDocuments({ status: 'new' }),
    Newsletter.countDocuments({ isSubscribed: true }),
    User.countDocuments({ isActive: true }),
  ]);

  const projectsByStatus = await Project.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: {
      companies, services, projects, blogs, news, documents,
      openJobs, newApplications, newInquiries, subscribers, adminUsers,
      projectsByStatus,
    },
  });
});

// @desc  Recent audit log entries
// @route GET /api/dashboard/audit-logs
const getAuditLogs = asyncHandler(async (req, res) => {
  const { module, user, page = 1, limit = 50 } = req.query;
  const query = {};
  if (module) query.module = module;
  if (user) query.user = user;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(200, parseInt(limit, 10));

  const [logs, total] = await Promise.all([
    AuditLog.find(query).sort('-createdAt').skip((pageNum - 1) * limitNum).limit(limitNum),
    AuditLog.countDocuments(query),
  ]);

  res.json({ success: true, count: logs.length, total, page: pageNum, data: logs });
});

module.exports = { getStats, getAuditLogs };
