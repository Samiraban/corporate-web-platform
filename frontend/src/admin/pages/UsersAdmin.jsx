import { useState, useEffect, useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ROLES = ['admin', 'content_manager', 'editor', 'hr', 'super_admin'];

export default function UsersAdmin() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' });

  const load = useCallback(() => {
    setLoading(true);
    api.get('/users').then((res) => setUsers(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/users', form);
      toast.success('Admin user created');
      setModalOpen(false);
      setForm({ name: '', email: '', password: '', role: 'editor' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { isActive: !u.isActive });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete admin account "${u.name}"?`)) return;
    try {
      await api.delete(`/users/${u._id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (me?.role !== 'super_admin') {
    return <p className="text-ash text-sm">Only the Super Admin can manage admin accounts.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Admin Users</h1>
        <button onClick={() => setModalOpen(true)} className="btn-primary text-sm py-2.5"><Plus size={16} /> Add Admin User</button>
      </div>

      <div className="bg-white border border-ink-100">
        {loading ? (
          <div className="p-10 text-center text-ash text-sm">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ash uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Active</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-ink-50 last:border-0">
                  <td className="px-5 py-3.5 text-ink-800">{u.name}</td>
                  <td className="px-5 py-3.5 text-ash text-xs">{u.email}</td>
                  <td className="px-5 py-3.5 text-ink-800 text-xs capitalize">{u.role.replace('_', ' ')}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleActive(u)} className={`text-xs px-2.5 py-1 rounded ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-ink-100 text-ash'}`}>
                      {u.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {u.role !== 'super_admin' && (
                      <button onClick={() => handleDelete(u)} className="text-xs text-red-600 hover:underline">Delete</button>
                    )}
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
              <h2 className="font-medium text-ink-900">Add Admin User</h2>
              <button onClick={() => setModalOpen(false)} className="text-ash hover:text-ink-900"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none" />
              <input required type="password" placeholder="Temporary password (min 8 chars)" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none" />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-ink-200 px-3 py-2 text-sm focus:border-brass-400 outline-none">
                {ROLES.map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
              </select>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-60">{saving ? 'Creating…' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
