import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const JOB_FIELDS = [
  { name: 'position', label: 'Position Title', required: true },
  { name: 'department', label: 'Department' },
  { name: 'location', label: 'Location' },
  {
    name: 'employmentType', label: 'Employment Type', type: 'select',
    options: ['full_time', 'part_time', 'contract', 'internship', 'remote'].map((v) => ({ value: v, label: v.replace('_', ' ') })),
  },
  { name: 'experience', label: 'Experience Required' },
  { name: 'salary', label: 'Salary' },
  { name: 'deadline', label: 'Application Deadline', type: 'date' },
  { name: 'responsibilities', label: 'Responsibilities (one per line, comma-separated)', type: 'textarea', rows: 3 },
  { name: 'requirements', label: 'Requirements (comma-separated)', type: 'textarea', rows: 3 },
  { name: 'vacancies', label: 'Number of Vacancies', type: 'number' },
  {
    name: 'status', label: 'Status', type: 'select', required: true,
    options: [{ value: 'draft', label: 'Draft' }, { value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' }],
  },
];

function JobsTab() {
  return (
    <ResourceManager
      title="Job Postings"
      endpoint="/careers/jobs"
      fields={JOB_FIELDS}
      emptyItem={{ status: 'draft', employmentType: 'full_time', vacancies: 1 }}
      transformSubmit={(form) => ({
        ...form,
        responsibilities: typeof form.responsibilities === 'string' ? form.responsibilities.split(',').map((s) => s.trim()).filter(Boolean) : form.responsibilities,
        requirements: typeof form.requirements === 'string' ? form.requirements.split(',').map((s) => s.trim()).filter(Boolean) : form.requirements,
      })}
      columns={[
        { key: 'position', label: 'Position' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
      ]}
    />
  );
}

const APP_STATUSES = ['received', 'shortlisted', 'interviewing', 'rejected', 'hired'];

function ApplicationsTab() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/careers/applications').then((res) => setApps(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/careers/applications/${id}`, { status });
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="p-10 text-center text-ash text-sm">Loading…</div>;
  if (apps.length === 0) return <div className="p-10 text-center text-ash text-sm">No applications yet.</div>;

  return (
    <div className="bg-white border border-ink-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs text-ash uppercase tracking-wide">
            <th className="px-5 py-3 font-medium">Applicant</th>
            <th className="px-5 py-3 font-medium">Position</th>
            <th className="px-5 py-3 font-medium">Contact</th>
            <th className="px-5 py-3 font-medium">CV</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr key={a._id} className="border-b border-ink-50 last:border-0">
              <td className="px-5 py-3.5 text-ink-800">{a.name}</td>
              <td className="px-5 py-3.5 text-ink-800">{a.job?.position}</td>
              <td className="px-5 py-3.5 text-ash text-xs">{a.email}<br />{a.phone}</td>
              <td className="px-5 py-3.5">
                <a href={a.cv?.url} target="_blank" rel="noreferrer" className="text-brass-500 hover:underline text-xs">View CV</a>
              </td>
              <td className="px-5 py-3.5">
                <select
                  value={a.status}
                  onChange={(e) => updateStatus(a._id, e.target.value)}
                  className="border border-ink-200 text-xs px-2 py-1.5"
                >
                  {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CareersAdmin() {
  const [tab, setTab] = useState('jobs');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink-900">Careers</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab('jobs')} className={`px-4 py-2 text-sm border ${tab === 'jobs' ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>Job Postings</button>
          <button onClick={() => setTab('applications')} className={`px-4 py-2 text-sm border ${tab === 'applications' ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>Applications</button>
        </div>
      </div>
      {tab === 'jobs' ? <JobsTab /> : <ApplicationsTab />}
    </div>
  );
}
