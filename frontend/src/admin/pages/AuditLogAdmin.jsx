import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../../services/api';

export default function AuditLogAdmin() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/audit-logs?limit=100').then((res) => setLogs(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink-900 mb-6">Audit Log</h1>
      <div className="bg-white border border-ink-100">
        {loading ? (
          <div className="p-10 text-center text-ash text-sm">Loading…</div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center text-ash text-sm">No activity recorded yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ash uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">When</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Action</th>
                <th className="px-5 py-3 font-medium">Module</th>
                <th className="px-5 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l._id} className="border-b border-ink-50 last:border-0">
                  <td className="px-5 py-3.5 text-ash text-xs whitespace-nowrap">{format(new Date(l.createdAt), 'MMM d, HH:mm')}</td>
                  <td className="px-5 py-3.5 text-ink-800 text-xs">{l.userName} <span className="text-ash">({l.userRole?.replace('_', ' ')})</span></td>
                  <td className="px-5 py-3.5 text-xs"><span className="px-2 py-0.5 bg-ink-100 rounded">{l.action}</span></td>
                  <td className="px-5 py-3.5 text-ink-800 text-xs">{l.module}</td>
                  <td className="px-5 py-3.5 text-ash text-xs">{l.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
