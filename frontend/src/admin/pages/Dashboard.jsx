import { useState, useEffect } from 'react';
import { Building2, Wrench, Briefcase, Newspaper, FileText, Mail, UserPlus, Users } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CARDS = [
  { key: 'companies', label: 'Published Companies', icon: Building2 },
  { key: 'services', label: 'Published Services', icon: Wrench },
  { key: 'projects', label: 'Total Projects', icon: Briefcase },
  { key: 'blogs', label: 'Published Posts', icon: Newspaper },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'openJobs', label: 'Open Positions', icon: Briefcase },
  { key: 'newApplications', label: 'New Applications', icon: UserPlus },
  { key: 'newInquiries', label: 'New Inquiries', icon: Mail },
  { key: 'subscribers', label: 'Newsletter Subscribers', icon: Users },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink-900">Welcome back, {user?.name?.split(' ')[0]}</h1>
      <p className="text-ash text-sm mt-1">Here's what's happening across OS Group right now.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {CARDS.map((c) => (
          <div key={c.key} className="bg-white border border-ink-100 p-6">
            <c.icon size={20} className="text-brass-500 mb-3" />
            <div className="text-2xl font-serif font-semibold text-ink-900">
              {stats ? stats[c.key] ?? 0 : '—'}
            </div>
            <div className="text-xs text-ash mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
