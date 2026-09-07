import { useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

/**
 * Drop-in replacement for a plain "image URL" text field. Shows a preview
 * thumbnail, uploads the chosen file straight to the media library
 * (/api/media/assets), and calls onChange with the resulting URL — so the
 * parent form still just stores a URL string, only now backed by a real
 * upload instead of the admin having to paste one in by hand.
 */
export default function ImageUploadField({ label, value, onChange, required }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post('/media/assets', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded border border-ink-200 bg-ink-50 flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={20} className="text-ash" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <label className="btn-outline text-xs py-2 cursor-pointer inline-flex">
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
            {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-red-600 hover:underline flex items-center gap-1"
            >
              <X size={12} /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}