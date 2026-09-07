const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const { ROLES } = require('../utils/constants');
const logAudit = require('../utils/logAudit');

// @desc  List all admin/staff users
// @route GET /api/users   (Super Admin, Admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort('-createdAt');
  res.json({ success: true, count: users.length, data: users });
});

// @desc  Create a new admin/staff user
// @route POST /api/users  (Super Admin only)
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, permissions } = req.body;

  if (role === ROLES.SUPER_ADMIN && req.user.role !== ROLES.SUPER_ADMIN) {
    throw new ApiError(403, 'Only a Super Admin can create another Super Admin');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    permissions,
    createdBy: req.user._id,
  });

  await logAudit({
    req,
    action: 'CREATE',
    module: 'User',
    targetId: user._id,
    description: `Created admin user ${user.email} with role ${user.role}`,
  });

  res.status(201).json({ success: true, data: user });
});

// @desc  Update a user's role/permissions/active status
// @route PUT /api/users/:id  (Super Admin only)
const updateUser = asyncHandler(async (req, res) => {
  const target = await User.findById(req.params.id);
  if (!target) throw new ApiError(404, 'User not found');

  if (target.role === ROLES.SUPER_ADMIN && req.user._id.toString() !== target._id.toString()) {
    throw new ApiError(403, 'Super Admin accounts can only be modified by themselves');
  }

  const { name, role, permissions, isActive } = req.body;
  if (name !== undefined) target.name = name;
  if (role !== undefined) target.role = role;
  if (permissions !== undefined) target.permissions = permissions;
  if (isActive !== undefined) target.isActive = isActive;

  await target.save();

  await logAudit({
    req,
    action: 'UPDATE',
    module: 'User',
    targetId: target._id,
    description: `Updated admin user ${target.email}`,
  });

  res.json({ success: true, data: target });
});

// @desc  Delete/disable a user
// @route DELETE /api/users/:id  (Super Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const target = await User.findById(req.params.id);
  if (!target) throw new ApiError(404, 'User not found');

  if (target.role === ROLES.SUPER_ADMIN) {
    throw new ApiError(403, 'A Super Admin account cannot be deleted');
  }
  if (target._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot delete your own account');
  }

  await target.deleteOne();

  await logAudit({
    req,
    action: 'DELETE',
    module: 'User',
    targetId: req.params.id,
    description: `Deleted admin user ${target.email}`,
  });

  res.json({ success: true, data: {} });
});

module.exports = { getUsers, createUser, updateUser, deleteUser };
