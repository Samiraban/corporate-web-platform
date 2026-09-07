import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import MagneticButton from './anim/MagneticButton';

const NAV = [
 {
  label: 'About',
  to: '/about',
  children: [
    { label: 'Who We Are', to: '/about/who-we-are' },
    { label: 'Our Values', to: '/about/our-values' },
    { label: 'How We Work', to: '/about/how-we-work' },
    { label: 'Our Network', to: '/about/our-network' },
  ],
},
  {
    label: 'Group Companies',
    to: '/companies',
    children: [
      { label: 'All Companies', to: '/companies' },
      { label: 'Industries We Serve', to: '/industries' },
    ],
  },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  {
    label: 'Insights',
    to: '/blog',
    children: [
      { label: 'Blog', to: '/blog' },
      { label: 'News & Announcements', to: '/news' },
    ],
  },
{
  label: 'Our People',
  to: '/team',
  children: [
    { label: 'Leadership', to: '/team' },
    { label: 'The Heart of OS Group', to: '/team/culture' },
  ],
},
{ label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-canvas/80 backdrop-blur-md shadow-sm' : 'bg-canvas/95 backdrop-blur'
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            className="font-serif text-2xl font-semibold text-ink-900"
            whileHover={{ letterSpacing: '0.01em' }}
            transition={{ duration: 0.3 }}
          >
            OS Group
          </motion.span>
          <span className="hidden sm:block text-[11px] text-ash tracking-wide self-end mb-1">
            OF COMPANY
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item, i) => (
            <motion.div
              key={item.label}
              className="relative group"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium flex items-center gap-1 py-2 ${
                    isActive ? 'text-brass-500' : 'text-ink-900'
                  } transition-colors`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {item.children && <ChevronDown size={14} />}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-brass-500"
                      initial={{ width: isActive ? '100%' : '0%' }}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.25 }}
                    />
                  </>
                )}
              </NavLink>
              {item.children && (
                <div className="absolute left-0 top-full w-56 bg-white border border-ink-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 py-2 origin-top">
                  {item.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="block px-4 py-2.5 text-sm text-ink-800 hover:bg-ink-50 hover:text-brass-500 hover:pl-5 transition-all"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden lg:flex items-center gap-4"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/search" aria-label="Search the site" className="text-ink-900 hover:text-brass-500 transition-colors">
            <Search size={19} />
          </Link>
          <MagneticButton as={Link} to="/contact" className="btn-primary" strength={0.2}>
            Get in Touch
          </MagneticButton>
        </motion.div>

        <button
          className="lg:hidden text-ink-900 relative z-10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden border-t border-ink-100 bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="container-page py-4 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-ink-900 font-medium border-b border-ink-50"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 pl-4 text-sm text-ash"
                    >
                      {c.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 justify-center w-full">
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}