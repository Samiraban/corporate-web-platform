import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Wrench, Briefcase, Newspaper, FileText,
  Image, Mail, Users, ScrollText, LogOut, Factory, Award, Handshake,
  Quote, HelpCircle, UserSquare2, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true }],
  },
  {
    label: 'Group Structure',
    items: [
      { to: '/admin/companies', icon: Building2, label: 'Companies' },
      { to: '/admin/industries', icon: Factory, label: 'Industries' },
      { to: '/admin/services', icon: Wrench, label: 'Services' },
      { to: '/admin/team', icon: UserSquare2, label: 'Team & Leadership' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/projects', icon: Briefcase, label: 'Projects' },
      { to: '/admin/blog', icon: Newspaper, label: 'Blog' },
      { to: '/admin/news', icon: Newspaper, label: 'News' },
      { to: '/admin/documents', icon: FileText, label: 'Documents' },
      { to: '/admin/media', icon: Image, label: 'Media Library' },
    ],
  },
  {
    label: 'Credibility',
    items: [
      { to: '/admin/awards', icon: Award, label: 'Awards' },
      { to: '/admin/partners', icon: Handshake, label: 'Partners & Clients' },
      { to: '/admin/testimonials', icon: Quote, label: 'Testimonials' },
      { to: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { to: '/admin/careers', icon: Briefcase, label: 'Careers' },
      { to: '/admin/inquiries', icon: Mail, label: 'Inquiries' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/users', icon: Users, label: 'Admin Users', roles: ['admin'] },
      { to: '/admin/audit-logs', icon: ScrollText, label: 'Audit Log', roles: ['admin'] },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout, can } = useAuth();
  const navigate = useNavigate();

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || can(...item.roles)),
  })).filter((group) => group.items.length > 0);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-ink-50">
      <aside className="w-64 bg-ink-900 text-white flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="font-serif text-xl font-semibold">OS Group</h1>
          <p className="text-xs text-ink-300 mt-0.5">Admin Panel</p>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-brass-400 text-ink-900 text-xs font-semibold px-3 py-2 rounded hover:bg-brass-300 transition-colors"
          >
            <ExternalLink size={13} />
            <span>Visit Live Website</span>
          </a>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[10px] font-semibold text-ink-400 uppercase tracking-wider mb-2">
                {group.label}
              </p>

              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                      isActive
                        ? 'bg-brass-400 text-ink-900 font-medium'
                        : 'text-ink-200 hover:bg-white/10'
                    }`
                  }
                >
                  <item.icon size={16} /> {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 mb-2">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-ink-400 capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink-200 hover:bg-white/10 w-full rounded"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}