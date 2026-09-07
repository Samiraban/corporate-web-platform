import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const STATUSES = ['new', 'in_progress', 'resolved', 'closed'];

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const q = filter ? `&type=${filter}` : '';
    api.get(`/inquiries?limit=100${q}`).then((res) => setInquiries(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}`, { status });
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Inquiries</h1>
        <div className="flex gap-2">
          {['', 'contact', 'business'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm border ${filter === f ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>
              {f || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-ash text-sm">Loading…</div>
      ) : inquiries.length === 0 ? (
        <div className="p-10 text-center text-ash text-sm bg-white border border-ink-100">No inquiries yet.</div>
      ) : (
        <div className="bg-white border border-ink-100 divide-y divide-ink-50">
          {inquiries.map((inq) => (
            <div key={inq._id} className="p-5">
              <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setExpanded(expanded === inq._id ? null : inq._id)}>
                <div>
                  <p className="font-medium text-ink-900 text-sm">{inq.name} <span className="text-ash font-normal">— {inq.subject || inq.type}</span></p>
                  <p className="text-xs text-ash mt-0.5">{inq.email} · Ref: {inq.referenceNumber}</p>
                </div>
                <select
                  value={inq.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateStatus(inq._id, e.target.value)}
                  className="border border-ink-200 text-xs px-2 py-1.5"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              {expanded === inq._id && (
                <div className="mt-4 pt-4 border-t border-ink-50 text-sm text-ink-700 space-y-2">
                  <p>{inq.message}</p>
                  {inq.phone && <p className="text-xs text-ash">Phone: {inq.phone}</p>}
                  {inq.company && <p className="text-xs text-ash">Company: {inq.company}</p>}
                  {inq.requiredService && <p className="text-xs text-ash">Service needed: {inq.requiredService}</p>}
                  {inq.budget && <p className="text-xs text-ash">Budget: {inq.budget}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
