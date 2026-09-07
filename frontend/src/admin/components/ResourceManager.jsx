import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ImageUploadField from './ImageUploadField';
/**
 * Generic CRUD screen for a REST resource.
 *
 * props:
 *  - title: string
 *  - endpoint: base API path, e.g. '/companies'
 *  - columns: [{ key, label, render? }]  — table columns
 *  - fields: [{ name, label, type: 'text'|'textarea'|'number'|'select'|'checkbox'|'date', options?, required? }]
 *  - emptyItem: default object for the "create" form
 *  - transformSubmit: optional (values) => payload, e.g. to split comma lists into arrays
 */
export default function ResourceManager({ title, endpoint, columns, fields, emptyItem = {}, transformSubmit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get(`${endpoint}?limit=100`)
      .then((res) => setItems(res.data.data))
      .catch(() => toast.error(`Failed to load ${title.toLowerCase()}`))
      .finally(() => setLoading(false));
  }, [endpoint, title]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyItem);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...emptyItem, ...item });
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name || item.title || item.position || 'this item'}"?`)) return;
    try {
      await api.delete(`${endpoint}/${item._id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = transformSubmit ? transformSubmit(form) : form;
      if (editing) {
        await api.put(`${endpoint}/${editing._id}`, payload);
        toast.success('Updated');
      } else {
        await api.post(endpoint, payload);
        toast.success('Created');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">{title}</h1>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="bg-white border border-ink-100">
        {loading ? (
          <div className="p-10 text-center text-ash text-sm">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-ash text-sm">No {title.toLowerCase()} yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ash uppercase tracking-wide">
                {columns.map((c) => <th key={c.key} className="px-5 py-3 font-medium">{c.label}</th>)}
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50">
                  {columns.map((c) => (
                    <td key={c.key} className="px-5 py-3.5 text-ink-800">
                      {c.render ? c.render(item) : String(item[c.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(item)} className="text-ink-500 hover:text-brass-500 p-1.5">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(item)} className="text-ink-500 hover:text-red-600 p-1.5">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-ink-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 sticky top-0 bg-white">
              <h2 className="font-medium text-ink-900">{editing ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h2>
              <button onClick={() => setModalOpen(false)} className="text-ash hover:text-ink-900"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  {field.type !== 'image' && (
                    <label className="block text-xs font-medium text-ink-700 mb-1.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                  )}
                  {field.type === 'image' ? (
                    <ImageUploadField
                      label={field.label}
                      value={form[field.name]}
                      onChange={(url) => updateField(field.name, url)}
                      required={field.required}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows={field.rows || 3}
                      value={form[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={form[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none"
                    >
                      <option value="">Select…</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!form[field.name]}
                      onChange={(e) => updateField(field.name, e.target.checked)}
                      className="h-4 w-4"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      value={form[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none"
                    />
                  )}
                  {field.hint && <p className="text-xs text-ash mt-1">{field.hint}</p>}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
