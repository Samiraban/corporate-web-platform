import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function MediaAdmin() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/media/assets?limit=100').then((res) => setAssets(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        await api.post('/media/assets', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      toast.success(`Uploaded ${files.length} file(s)`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (asset) => {
    if (!window.confirm('Delete this asset?')) return;
    try {
      await api.delete(`/media/assets/${asset._id}`);
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Media Library</h1>
        <label className="btn-primary text-sm py-2.5 cursor-pointer">
          <Upload size={16} /> {uploading ? 'Uploading…' : 'Upload Files'}
          <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="p-10 text-center text-ash text-sm">Loading…</div>
      ) : assets.length === 0 ? (
        <div className="p-10 text-center text-ash text-sm bg-white border border-ink-100">No media uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {assets.map((a) => (
            <div key={a._id} className="relative group aspect-square bg-white border border-ink-100 overflow-hidden">
              {a.type === 'image' ? (
                <img src={a.url} alt={a.altText || a.originalName} className="w-full h-full object-cover" />
              ) : (
                <video src={a.url} className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => handleDelete(a)}
                className="absolute top-1.5 right-1.5 bg-white/90 text-red-600 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
