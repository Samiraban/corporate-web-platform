const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { Job, Application } = require('../models/Career');
const escapeRegex = require('../utils/escapeRegex');
const logAudit = require('../utils/logAudit');
const { JOB_STATUS } = require('../utils/constants');
const sendEmail = require('../utils/sendEmail');

// ---------- Jobs ----------

const getJobs = asyncHandler(async (req, res) => {
  const { department, location, employmentType, status, search } = req.query;
  const query = {};
  if (department) query.department = department;
  if (location) query.location = location;
  if (employmentType) query.employmentType = employmentType;
  // Public site should only ever see open jobs unless an admin is asking
  query.status = req.user ? status || { $in: Object.values(JOB_STATUS) } : JOB_STATUS.OPEN;
  if (search) query.position = { $regex: escapeRegex(search), $options: 'i' };

  const jobs = await Job.find(query).populate('company', 'name slug logo').sort('-createdAt');
  res.json({ success: true, count: jobs.length, data: jobs });
});

const getJobBySlug = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug }).populate('company', 'name slug logo');
  if (!job) throw new ApiError(404, 'Job not found');
  res.json({ success: true, data: job });
});

const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user._id });
  await logAudit({ req, action: 'CREATE', module: 'Job', targetId: job._id, description: `Created job posting "${job.position}"` });
  res.status(201).json({ success: true, data: job });
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!job) throw new ApiError(404, 'Job not found');
  await logAudit({ req, action: 'UPDATE', module: 'Job', targetId: job._id, description: `Updated job posting "${job.position}"` });
  res.json({ success: true, data: job });
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) throw new ApiError(404, 'Job not found');
  await logAudit({ req, action: 'DELETE', module: 'Job', targetId: req.params.id, description: `Deleted job posting "${job.position}"` });
  res.json({ success: true, data: {} });
});

// ---------- Applications ----------

// @desc  Public: submit a job application (multipart/form-data, field: cv)
const applyToJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.body.job);
  if (!job || job.status !== JOB_STATUS.OPEN) {
    throw new ApiError(400, 'This position is not currently accepting applications');
  }
  if (!req.file) throw new ApiError(400, 'A CV/resume file is required');

  const application = await Application.create({
    ...req.body,
    cv: { url: `/uploads/applications/${req.file.filename}`, originalName: req.file.originalname },
  });

  sendEmail({
    to: process.env.NOTIFY_EMAIL,
    subject: `New application: ${job.position}`,
    text: `${application.name} applied for ${job.position}. Email: ${application.email}, Phone: ${application.phone}`,
  }).catch((err) => console.error('Email notify failed:', err.message));

  sendEmail({
    to: application.email,
    subject: `We received your application — ${job.position}`,
    text: `Hi ${application.name}, thank you for applying to ${job.position} at OS GROUP OF COMPANY. Our HR team will review your application and reach out if there's a match.`,
  }).catch((err) => console.error('Confirmation email failed:', err.message));

  res.status(201).json({ success: true, data: application });
});

// @desc  Admin/HR: list applications, optionally filtered by job
const getApplications = asyncHandler(async (req, res) => {
  const { job, status } = req.query;
  const query = {};
  if (job) query.job = job;
  if (status) query.status = status;

  const applications = await Application.find(query)
    .populate('job', 'position department')
    .sort('-createdAt');
  res.json({ success: true, count: applications.length, data: applications });
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, notes: req.body.notes, reviewedBy: req.user._id },
    { new: true }
  );
  if (!application) throw new ApiError(404, 'Application not found');
  await logAudit({
    req,
    action: 'UPDATE',
    module: 'Application',
    targetId: application._id,
    description: `Marked application as ${application.status}`,
  });
  res.json({ success: true, data: application });
});

module.exports = {
  getJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getApplications,
  updateApplicationStatus,
};
