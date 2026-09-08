const crypto = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const logAudit = require('../utils/logAudit');
const sendEmail = require('../utils/sendEmail');

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

// @desc  Request a password-reset link by email
// @route POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, 'Please provide an email address');
  }

  // Same response whether or not the account exists — confirming/denying
  // that here would let an attacker enumerate admin email addresses.
  const genericMessage = 'If an account exists for that email, a password reset link has been sent.';

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: true, message: genericMessage });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const clientUrl = process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:5173';
  const resetUrl = `${clientUrl}/admin/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'OS Group Admin — Password Reset',
      html: `
        <p>Hi ${user.name},</p>
        <p>You (or someone else) requested a password reset for the OS Group admin panel. This link expires in 30 minutes:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn't request this, you can safely ignore this email — your password will stay unchanged.</p>
      `,
      text: `You requested a password reset for the OS Group admin panel. Visit this link within 30 minutes to choose a new password:\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
    });
  } catch (err) {
    // Roll back the token so a failed send doesn't leave a live,
    // never-delivered reset link sitting on the account.
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, 'Could not send the reset email. Please try again later.');
  }

  await logAudit({
    req: { ...req, user },
    action: 'PASSWORD_RESET_REQUEST',
    module: 'Auth',
    targetId: user._id,
    description: `${user.name} requested a password reset`,
  });

  res.json({ success: true, message: genericMessage });
});

// @desc  Set a new password using the token emailed by forgotPassword
// @route PUT /api/auth/reset-password/:token
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 8) {
    throw new ApiError(400, 'New password must be at least 8 characters');
  }

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+password');

  if (!user) {
    throw new ApiError(400, 'This reset link is invalid or has expired. Please request a new one.');
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  await logAudit({
    req: { ...req, user },
    action: 'PASSWORD_RESET',
    module: 'Auth',
    targetId: user._id,
    description: `${user.name} reset their password`,
  });

  sendTokenResponse(user, 200, res);
});

module.exports = { login, logout, getMe, updatePassword, forgotPassword, resetPassword };