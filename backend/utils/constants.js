// Admin roles — Super Admin has 360° authority (see requirements doc Section 15)
const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  CONTENT_MANAGER: 'content_manager',
  EDITOR: 'editor',
  HR: 'hr',
};

const ALL_ROLES = Object.values(ROLES);

// Generic content workflow (Section 16): Draft → Review → Approved → Published → Archived
const CONTENT_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  APPROVED: 'approved',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

const PROJECT_STATUS = {
  COMPLETED: 'completed',
  ONGOING: 'ongoing',
  UPCOMING: 'upcoming',
};

const JOB_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  DRAFT: 'draft',
};

const APPLICATION_STATUS = {
  RECEIVED: 'received',
  SHORTLISTED: 'shortlisted',
  INTERVIEWING: 'interviewing',
  REJECTED: 'rejected',
  HIRED: 'hired',
};

const INQUIRY_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

module.exports = {
  ROLES,
  ALL_ROLES,
  CONTENT_STATUS,
  PROJECT_STATUS,
  JOB_STATUS,
  APPLICATION_STATUS,
  INQUIRY_STATUS,
};
