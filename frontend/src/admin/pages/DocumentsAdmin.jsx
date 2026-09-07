import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const CATEGORIES = [
  'registration', 'pan_vat', 'license', 'certificate', 'award', 'company_profile',
  'brochure', 'annual_report', 'policy', 'service_document', 'project_document', 'presentation', 'other',
];

export default function DocumentsAdmin() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'other', visibility: 'public' });
  const [file, setFile] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/documents?limit=100').then((res) => setDocs(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (doc) => {
    if (!window.confirm(`Delete "${doc.title}"?`)) return;
    try {
      await api.delete(`/documents/${doc._id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please choose a file');
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('file', file);
      await api.post('/documents', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Uploaded');
      setModalOpen(false);
      setForm({ title: '', category: 'other', visibility: 'public' });
      setFile(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Document Center</h1>
        <button onClick={() => setModalOpen(true)} className="btn-primary text-sm py-2.5"><Plus size={16} /> Upload Document</button>
      </div>

      <div className="bg-white border border-ink-100">
        {loading ? (
          <div className="p-10 text-center text-ash text-sm">Loading…</div>
        ) : docs.length === 0 ? (
          <div className="p-10 text-center text-ash text-sm">No documents uploaded yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ash uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Visibility</th>
                <th className="px-5 py-3 font-medium">Downloads</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d._id} className="border-b border-ink-50 last:border-0">
                  <td className="px-5 py-3.5 text-ink-800">{d.title}</td>
                  <td className="px-5 py-3.5 text-ash text-xs capitalize">{d.category.replace('_', ' ')}</td>
                  <td className="px-5 py-3.5 text-ash text-xs capitalize">{d.visibility}</td>
                  <td className="px-5 py-3.5 text-ash text-xs">{d.downloadCount}</td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <a href={d.file?.url} target="_blank" rel="noreferrer" className="text-ink-500 hover:text-brass-500 p-1.5 inline-block"><Download size={15} /></a>
                    <button onClick={() => handleDelete(d)} className="text-ink-500 hover:text-red-600 p-1.5"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-ink-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
              <h2 className="font-medium text-ink-900">Upload Document</h2>
              <button onClick={() => setModalOpen(false)} className="text-ash hover:text-ink-900"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1.5">Visibility</label>
                <select value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1.5">File *</label>
                <input type="file" required onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-60">{saving ? 'Uploading…' : 'Upload'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
