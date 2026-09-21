import { useState, useEffect } from 'react';
import {
  Building2,
  Wrench,
  Briefcase,
  Newspaper,
  FileText,
  Mail,
  UserPlus,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CARDS = [
  {
    key: 'companies',
    label: 'Published Companies',
    icon: Building2,
    color: 'bg-violet-100 text-violet-700',
  },
  {
    key: 'services',
    label: 'Published Services',
    icon: Wrench,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    key: 'projects',
    label: 'Total Projects',
    icon: Briefcase,
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    key: 'blogs',
    label: 'Published Posts',
    icon: Newspaper,
    color: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: FileText,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    key: 'openJobs',
    label: 'Open Positions',
    icon: Briefcase,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    key: 'newApplications',
    label: 'New Applications',
    icon: UserPlus,
    color: 'bg-orange-100 text-orange-700',
  },
  {
    key: 'newInquiries',
    label: 'New Inquiries',
    icon: Mail,
    color: 'bg-pink-100 text-pink-700',
  },
  {
    key: 'subscribers',
    label: 'Newsletter Subscribers',
    icon: Users,
    color: 'bg-cyan-100 text-cyan-700',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((res) => setStats(res.data.data))
      .catch(() => {});
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Admin';

  return (
    <div className="min-h-full bg-[#f7f5ff] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 mb-3">
              OS GROUP ADMIN
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-950">
              Welcome back, {firstName}
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Here's what's happening across OS Group right now.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white border border-violet-100 px-4 py-3 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-gray-700">
              Admin system active
            </span>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.key}
              className="group relative overflow-hidden rounded-2xl bg-white border border-violet-100 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={21} strokeWidth={2} />
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition">
                  <ArrowUpRight size={16} />
                </div>

              </div>

              {/* Number */}
              <div className="mt-6">
                <div className="text-3xl font-bold text-gray-950 tracking-tight">
                  {stats ? stats[card.key] ?? 0 : '—'}
                </div>

                <div className="text-sm font-medium text-gray-500 mt-1">
                  {card.label}
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      {/* Bottom information section */}
      <div className="mt-8 grid lg:grid-cols-3 gap-5">

        <div className="lg:col-span-2 rounded-2xl bg-white border border-violet-100 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Building2 size={19} className="text-violet-700" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-950">
                OS Group Overview
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your organisation from one place.
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-gray-600">
            Use the admin panel to manage companies, services, projects,
            news, documents, careers, enquiries and newsletter subscribers.
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-700 to-purple-800 p-6 sm:p-7 shadow-lg text-white">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-5">
            <Users size={20} />
          </div>

          <h2 className="font-serif text-xl font-semibold">
            Administration
          </h2>

          <p className="text-sm text-violet-100 leading-6 mt-2">
            Keep your OS Group content organised, updated and ready for
            your visitors.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
            Dashboard connected
          </div>
        </div>

      </div>
    </div>
  );
}