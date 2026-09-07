const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const logAudit = require('../utils/logAudit');

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: (Number(process.env.JWT_COOKIE_EXPIRES_DAYS) || 7) * 24 * 60 * 60 * 1000,
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateToken();
  res.cookie('token', token, cookieOptions());
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      avatar: user.avatar,
    },
  });
};

// @desc  Login admin user
// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.isActive) {
    throw new ApiError(403, 'This account has been disabled. Contact your Super Admin.');
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  await logAudit({
    req: { ...req, user },
    action: 'LOGIN',
    module: 'Auth',
    targetId: user._id,
    description: `${user.name} logged in`,
  });

  sendTokenResponse(user, 200, res);
});

// @desc  Log out (clear cookie)
// @route POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', { httpOnly: true, expires: new Date(Date.now() + 5000) });
  res.json({ success: true, message: 'Logged out successfully' });
});

// @desc  Get currently logged-in user
// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

// @desc  Update own password
// @route PUT /api/auth/update-password
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }
  if (!newPassword || newPassword.length < 8) {
    throw new ApiError(400, 'New password must be at least 8 characters');
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

module.exports = { login, logout, getMe, updatePassword };
