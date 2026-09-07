const express = require('express');
const careerController = require('../controllers/careerController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { uploadCV } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

const router = express.Router();
const jobWriteGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR)];
const hrGuard = [protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR)];

// Jobs — public can list/view open jobs; HR/Admin manage them.
// optionalAuth attaches req.user when a valid token is present (so
// admins see draft/closed jobs too) without requiring one.
router.get('/jobs', optionalAuth, careerController.getJobs);
router.get('/jobs/slug/:slug', careerController.getJobBySlug);
router.post('/jobs', ...jobWriteGuard, careerController.createJob);
router.put('/jobs/:id', ...jobWriteGuard, careerController.updateJob);
router.delete('/jobs/:id', ...jobWriteGuard, careerController.deleteJob);

// Applications
router.post('/applications', uploadCV.single('cv'), careerController.applyToJob);
router.get('/applications', ...hrGuard, careerController.getApplications);
router.put('/applications/:id', ...hrGuard, careerController.updateApplicationStatus);

module.exports = router;
