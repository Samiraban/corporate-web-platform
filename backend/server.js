require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

connectDB();

const app = express();

// ---------- Security & core middleware ----------
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
// NOTE: origin '*' combined with credentials:true is rejected by browsers,
// so silently falling back to '*' here would make cookie-based admin auth
// fail with a confusing CORS error instead of a clear startup error.
if (!process.env.CLIENT_URL) {
  console.warn('WARNING: CLIENT_URL is not set — defaulting CORS to http://localhost:5173. Set CLIENT_URL explicitly in production.');
}
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting — protects login and public form endpoints from abuse
const limiter = rateLimit({
  windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MIN) || 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Static file serving for uploaded documents/media
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- Routes ----------
app.get('/api/health', (req, res) => res.json({ success: true, message: 'OS Group API is running' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/industries', require('./routes/industryRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api', require('./routes/miscRoutes')); // /awards /partners /testimonials /faqs
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// ---------- Error handling (must be last) ----------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`OS Group API server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
