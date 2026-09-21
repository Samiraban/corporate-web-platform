import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Search, X, ArrowUpRight } from 'lucide-react';

const NAV = [
  {
    label: 'About',
    to: '/about/who-we-are',
    children: [
      ['Who We Are', '/about/who-we-are'],
      ['Our Values', '/about/our-values'],
      ['How We Work', '/about/how-we-work'],
      ['Our Network', '/about/our-network'],
    ],
  },
  {
    label: 'Group Companies',
    to: '/companies',
    children: [
      ['All Companies', '/companies'],
      ['Industries We Serve', '/industries'],
    ],
  },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  {
    label: 'Insights',
    to: '/blog',
    children: [
      ['Blog', '/blog'],
      ['News & Announcements', '/news'],
    ],
  },
  {
    label: 'Our People',
    to: '/team',
    children: [
      ['Leadership', '/team'],
      ['The Heart of OS Group', '/team/culture'],
    ],
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const ease = [0.16, 1, 0.3, 1];

function navClass({ isActive }) {
  return [
    'relative inline-flex min-h-10 items-center gap-1.5 rounded-full px-3',
    'text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2',
    isActive ? 'text-[#6f4fb0]' : 'text-[#343047] hover:text-[#7657b7]',
  ].join(' ');
}

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease }}
      className="fixed inset-x-0 top-0 z-[100] px-2 pt-2 sm:px-3 lg:px-4"
    >
      <div
        className={[
          'mx-auto max-w-[1500px] rounded-[18px] border bg-white/95 backdrop-blur-xl',
          'transition-all duration-300',
          scrolled
            ? 'border-[#ddd5ec] shadow-[0_12px_35px_rgba(82,58,128,0.10)]'
            : 'border-[#e8e2f0] shadow-[0_5px_20px_rgba(82,58,128,0.06)]',
        ].join(' ')}
      >
        <div className="container-page flex min-h-[68px] items-center justify-between gap-4 lg:min-h-[72px]">
          <Link
            to="/"
            aria-label="OS Group home"
            className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2"
          >
            <motion.img
              src="/images/os-group-logo.png"
              alt="OS Group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="h-12 w-auto max-w-[175px] object-contain md:h-14 md:max-w-[205px]"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setDropdown(item.label)}
                onMouseLeave={() => item.children && setDropdown(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={navClass({
                      isActive:
                        location.pathname.startsWith(item.to) ||
                        item.children.some(([, to]) => location.pathname.startsWith(to)),
                    })}
                    aria-expanded={dropdown === item.label}
                    onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${dropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <NavLink to={item.to} className={navClass}>
                    {item.label}
                  </NavLink>
                )}

                <AnimatePresence>
                  {item.children && dropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 7, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.18, ease }}
                      className="absolute left-1/2 top-[calc(100%+8px)] w-[290px] -translate-x-1/2 rounded-2xl border border-[#ddd4eb] bg-white p-2.5 shadow-[0_18px_45px_rgba(82,58,128,0.14)]"
                    >
                      {item.children.map(([label, to]) => (
                        <NavLink
                          key={to}
                          to={to}
                          className={({ isActive }) =>
                            [
                              'group flex min-h-12 items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold leading-5 transition-colors',
                              isActive
                                ? 'bg-[#eee5fa] text-[#60429a]'
                                : 'text-[#172033] hover:bg-[#f5f0fb] hover:text-[#6848a5]',
                            ].join(' ')
                          }
                        >
                          <span className="pr-3">{label}</span>
                          <ArrowUpRight size={14} className="opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/search"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1dbea] bg-white text-[#454055] transition-all duration-200 hover:border-[#c9b8e7] hover:bg-[#f7f3fc] hover:text-[#7657b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2"
            >
              <Search size={17} aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-[#7d5bc4] px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(125,91,196,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6f4fb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2"
            >
              Get in Touch
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e1dbea] bg-white text-[#343047] transition-colors hover:bg-[#f7f3fc] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="overflow-hidden border-t border-[#ebe6f2] lg:hidden"
            >
              <nav className="max-h-[calc(100vh-86px)] overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
                {NAV.map((item, index) => (
                  <div key={item.label} className="border-b border-[#eeeaf4] last:border-0">
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                          aria-expanded={dropdown === item.label}
                          className="flex w-full items-center justify-between py-3.5 text-left text-sm font-bold text-[#343047]"
                        >
                          {item.label}
                          <ChevronDown size={16} className={`transition-transform ${dropdown === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {dropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pb-2 pl-3"
                            >
                              {item.children.map(([label, to]) => (
                                <Link key={to} to={to} className="block rounded-xl px-3 py-2.5 text-sm font-bold leading-5 text-[#263247] hover:bg-[#f5f0fb] hover:text-[#6848a5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9]">
                                  {label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={item.to} className="block py-3.5 text-sm font-bold text-[#343047] hover:text-[#7657b7]">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="flex gap-2 pt-4">
                  <Link to="/search" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#ddd5ea] bg-white text-sm font-bold text-[#454055]">
                    <Search size={16} /> Search
                  </Link>
                  <Link to="/contact" className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#7d5bc4] text-sm font-bold text-white">
                    Contact us
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
