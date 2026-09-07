const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const { ROLES } = require('../utils/constants');

// Verifies the JWT (from Authorization header or httpOnly cookie) and
// attaches the authenticated admin user to req.user.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized. Please log in.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    throw new ApiError(401, 'The user belonging to this token no longer exists.');
  }
  if (!user.isActive) {
    throw new ApiError(403, 'This account has been disabled. Contact your Super Admin.');
  }

  req.user = user;
  next();
});

// Restricts a route to specific roles.
// Super Admin ALWAYS passes — 360° authority overrides any role check
// (requirements doc Section 15: "No normal Admin/Editor/HR user may
// override Super Admin").
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized. Please log in.');
  }
  if (req.user.role === ROLES.SUPER_ADMIN) {
    return next();
  }
  if (!allowedRoles.includes(req.user.role)) {
    throw new ApiError(
      403,
      `Your role (${req.user.role}) is not permitted to perform this action.`
    );
  }
  next();
};

// Convenience: Super Admin only
const superAdminOnly = authorize(ROLES.SUPER_ADMIN);

// Attaches req.user if a valid token is present, but never rejects the
// request when one is absent or invalid — used on routes that behave
// differently for logged-in admins vs. the public (e.g. job listings).
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (user && user.isActive) req.user = user;
  } catch (err) {
    // invalid/expired token on an optional route — proceed as anonymous
  }
  next();
});

module.exports = { protect, authorize, superAdminOnly, optionalAuth };
