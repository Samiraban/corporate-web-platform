const mongoose = require('mongoose');

// Single media library asset — used by the Media Center (Section 17) and
// referenced by album entries below.
const mediaAssetSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    originalName: { type: String },
    altText: { type: String },
    caption: { type: String },
    mimeType: { type: String },
    sizeBytes: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    coverImage: { type: String },
    description: { type: String },
    items: [
      {
        url: String,
        type: { type: String, enum: ['image', 'video', 'youtube'], default: 'image' },
        caption: String,
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const MediaAsset = mongoose.model('MediaAsset', mediaAssetSchema);
const Album = mongoose.model('Album', albumSchema);

module.exports = { MediaAsset, Album };
