const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, superAdminOnly, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(protect);

router.get('/', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getUsers);
router.post('/', superAdminOnly, createUser);
router.put('/:id', superAdminOnly, updateUser);
router.delete('/:id', superAdminOnly, deleteUser);

module.exports = router;
