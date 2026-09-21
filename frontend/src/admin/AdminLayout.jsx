import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Wrench,
  Briefcase,
  Newspaper,
  FileText,
  Image,
  Mail,
  Users,
  ScrollText,
  LogOut,
  Factory,
  Award,
  Handshake,
  Quote,
  HelpCircle,
  UserSquare2,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      {
        to: '/admin',
        icon: LayoutDashboard,
        label: 'Dashboard',
        end: true,
      },
    ],
  },
  {
    label: 'Group Structure',
    items: [
      {
        to: '/admin/companies',
        icon: Building2,
        label: 'Companies',
      },
      {
        to: '/admin/industries',
        icon: Factory,
        label: 'Industries',
      },
      {
        to: '/admin/services',
        icon: Wrench,
        label: 'Services',
      },
      {
        to: '/admin/team',
        icon: UserSquare2,
        label: 'Team & Leadership',
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        to: '/admin/projects',
        icon: Briefcase,
        label: 'Projects',
      },
      {
        to: '/admin/blog',
        icon: Newspaper,
        label: 'Blog',
      },
      {
        to: '/admin/news',
        icon: Newspaper,
        label: 'News',
      },
      {
        to: '/admin/documents',
        icon: FileText,
        label: 'Documents',
      },
      {
        to: '/admin/media',
        icon: Image,
        label: 'Media Library',
      },
    ],
  },
  {
    label: 'Credibility',
    items: [
      {
        to: '/admin/awards',
        icon: Award,
        label: 'Awards',
      },
      {
        to: '/admin/partners',
        icon: Handshake,
        label: 'Partners & Clients',
      },
      {
        to: '/admin/testimonials',
        icon: Quote,
        label: 'Testimonials',
      },
      {
        to: '/admin/faqs',
        icon: HelpCircle,
        label: 'FAQs',
      },
    ],
  },
  {
    label: 'Engagement',
    items: [
      {
        to: '/admin/careers',
        icon: Briefcase,
        label: 'Careers',
      },
      {
        to: '/admin/inquiries',
        icon: Mail,
        label: 'Inquiries',
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        to: '/admin/users',
        icon: Users,
        label: 'Admin Users',
        roles: ['admin'],
      },
      {
        to: '/admin/audit-logs',
        icon: ScrollText,
        label: 'Audit Log',
        roles: ['admin'],
      },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout, can } = useAuth();
  const navigate = useNavigate();

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !item.roles || can(...item.roles)
    ),
  })).filter((group) => group.items.length > 0);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#f7f6f3] text-[#111111]">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="w-64 bg-white border-r border-[#e5e1da] flex flex-col shrink-0">

        {/* ===================================================
            BRAND
        ==================================================== */}

        <div className="px-6 py-6 border-b border-[#e5e1da]">

          <h1 className="font-serif text-xl font-semibold text-[#111111]">
            OS Group
          </h1>

          <p className="text-xs text-[#777777] mt-0.5">
            Admin Panel
          </p>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
              bg-brass-400
              text-[#111111]
              text-xs
              font-semibold
              px-3
              py-2
              rounded
              hover:bg-brass-300
              transition-colors
            "
          >
            <ExternalLink size={13} />

            <span>
              Visit Live Website
            </span>
          </a>

        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">

          {visibleGroups.map((group) => (

            <div key={group.label}>

              {/* GROUP TITLE */}

              <p
                className="
                  px-3
                  text-[10px]
                  font-semibold
                  text-[#888888]
                  uppercase
                  tracking-wider
                  mb-2
                "
              >
                {group.label}
              </p>

              {/* NAV ITEMS */}

              {group.items.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    text-sm
                    rounded-lg
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? `
                          bg-[#f1e7d0]
                          text-[#111111]
                          font-semibold
                          shadow-sm
                        `
                        : `
                          text-[#333333]
                          hover:bg-[#f5f3ef]
                          hover:text-[#111111]
                        `
                    }
                    `
                  }
                >
                  <item.icon
                    size={16}
                    strokeWidth={1.8}
                  />

                  <span>
                    {item.label}
                  </span>
                </NavLink>

              ))}

            </div>

          ))}

        </nav>

        {/* ===================================================
            USER / LOGOUT
        ==================================================== */}

        <div className="px-3 py-4 border-t border-[#e5e1da]">

          <div className="px-3 mb-3">

            <p className="text-sm font-semibold text-[#111111]">
              {user?.name}
            </p>

            <p className="text-xs text-[#777777] capitalize mt-0.5">
              {user?.role?.replace('_', ' ')}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-3
              px-3
              py-2.5
              text-sm
              text-[#333333]
              hover:bg-[#f5f3ef]
              hover:text-[#111111]
              w-full
              rounded-lg
              transition-colors
            "
          >
            <LogOut
              size={16}
              strokeWidth={1.8}
            />

            <span>
              Log Out
            </span>
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN ADMIN CONTENT
      ====================================================== */}

      <main className="flex-1 overflow-y-auto">

        <div className="p-8 max-w-6xl">

          <Outlet />

        </div>

      </main>

    </div>
  );
}