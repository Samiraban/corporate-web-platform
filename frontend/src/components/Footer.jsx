import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import AnimatedSection from './anim/AnimatedSection';
import BackToTop from './BackToTop';

const socialIcon = { hover: { y: -3, scale: 1.15 } };

export default function Footer() {
  const [general, setGeneral] = useState(null);

  useEffect(() => {
    api.get('/settings/general').then((res) => setGeneral(res.data.data)).catch(() => {});
  }, []);

  return (
    <footer className="relative bg-ink-900 text-ink-100 mt-32 overflow-hidden">
      {/* subtle moving background glow */}
      <motion.div
        className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-brass-500/10 blur-3xl pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatedSection direction="up" className="container-page py-16 grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        <div className="md:col-span-1">
          <span className="font-serif text-2xl font-semibold text-white">OS Group</span>
          <p className="mt-4 text-sm text-ink-300 leading-relaxed">
            {general?.tagline || 'A diversified group of companies building across industries.'}
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { Icon: Facebook, href: general?.facebook, label: 'Facebook' },
              { Icon: Instagram, href: general?.instagram, label: 'Instagram' },
              { Icon: Linkedin, href: general?.linkedin, label: 'LinkedIn' },
              { Icon: Youtube, href: general?.youtube, label: 'YouTube' },
            ]
              .filter(({ href }) => href)
              .map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink-300 hover:text-brass-400"
                whileHover="hover"
                variants={socialIcon}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-ink-300">
            {[
              ['/about', 'About the Group'], ['/companies', 'Group Companies'],
              ['/services', 'Services'], ['/projects', 'Projects'], ['/documents', 'Document Center'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="relative inline-block hover:text-brass-400 transition-colors group">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brass-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-ink-300">
            {[
              ['/team', 'Leadership'], ['/blog', 'Blog'], ['/news', 'News & Announcements'],
              ['/careers', 'Careers'], ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="relative inline-block hover:text-brass-400 transition-colors group">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brass-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brass-400" />
              <span>{general?.headquarters || 'Kathmandu, Nepal'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-brass-400" />
              <span>{general?.phone || '+977-1-XXXXXXX'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-brass-400" />
              <span>{general?.email || 'info@osgroup.com'}</span>
            </li>
          </ul>
        </div>
      </AnimatedSection>

         <div className="border-t border-ink-800 relative">
        <div className="container-page py-6 text-xs text-ink-400 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <span>&copy; {new Date().getFullYear()} OS Group of Company. All rights reserved.</span>
          {/* Hidden admin entry point: a barely-visible dot, invisible at a
              glance, that only reveals itself on hover. No label, no
              tooltip — deliberately undiscoverable by casual visitors. */}
          <Link
            to="/admin/login"
            aria-hidden="true"
            tabIndex={-1}
            className="w-1.5 h-1.5 rounded-full bg-ink-800 opacity-40 hover:opacity-100 hover:bg-brass-400 transition-all duration-300 shrink-0"
          />
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}