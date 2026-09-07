const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

// In production, swap diskStorage for a cloud storage adapter (S3 /
// Cloudinary / GCS) — the requirements doc (Section 17) calls for
// "scalable cloud storage/CDN-ready architecture". Disk storage is used
// here so the project runs standalone in development.
const makeStorage = (subfolder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', subfolder);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${unique}${ext}`);
    },
  });

const IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const VIDEO_TYPES = ['.mp4', '.mov', '.webm'];
const DOCUMENT_TYPES = [
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png',
];
const CV_TYPES = ['.pdf', '.doc', '.docx'];

const fileFilterFactory = (allowedExts) => (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, `File type ${ext} is not allowed. Allowed: ${allowedExts.join(', ')}`));
  }
};

const maxSize = (Number(process.env.MAX_FILE_UPLOAD_MB) || 10) * 1024 * 1024;

const uploadDocument = multer({
  storage: makeStorage('documents'),
  fileFilter: fileFilterFactory(DOCUMENT_TYPES),
  limits: { fileSize: maxSize },
});

const uploadMedia = multer({
  storage: makeStorage('media'),
  fileFilter: fileFilterFactory([...IMAGE_TYPES, ...VIDEO_TYPES]),
  limits: { fileSize: maxSize },
});

const uploadCV = multer({
  storage: makeStorage('applications'),
  fileFilter: fileFilterFactory(CV_TYPES),
  limits: { fileSize: maxSize },
});

module.exports = { uploadDocument, uploadMedia, uploadCV };
