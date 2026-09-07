import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/about/who-we-are', label: 'Who We Are' },
  { to: '/about/our-values', label: 'Our Values' },
  { to: '/about/how-we-work', label: 'How We Work' },
  { to: '/about/our-network', label: 'Our Network' },
];

export default function AboutSubNav() {
  return (
    <div className="border-b border-ink-100 bg-white sticky top-20 z-20">
      <div className="container-page flex gap-8 overflow-x-auto">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `relative py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-brass-500' : 'text-ink-600 hover:text-ink-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-brass-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}