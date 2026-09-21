import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

import api from '../services/api';
import AnimatedSection from './anim/AnimatedSection';
import BackToTop from './BackToTop';

const groups = [
  {
    title: 'Explore',
    links: [
      ['/about/who-we-are', 'About the Group'],
      ['/companies', 'Group Companies'],
      ['/services', 'Services'],
      ['/projects', 'Projects'],
      ['/documents', 'Documents'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/team', 'Leadership'],
      ['/blog', 'Blog'],
      ['/news', 'News & Announcements'],
      ['/careers', 'Careers'],
      ['/contact', 'Contact'],
    ],
  },
];

export default function Footer() {
  const [general, setGeneral] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get('/settings/general').then((res) => {
      if (mounted) setGeneral(res.data?.data || null);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  const socials = [
    [Facebook, general?.facebook, 'Facebook'],
    [Instagram, general?.instagram, 'Instagram'],
    [Linkedin, general?.linkedin, 'LinkedIn'],
    [Youtube, general?.youtube, 'YouTube'],
  ].filter(([, href]) => href);

  return (
    <footer className="relative overflow-hidden border-t border-[#e5dff0] bg-[#f7f4fc]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e8dcfa] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#f2e8ff] blur-3xl" aria-hidden="true" />

      <AnimatedSection direction="up" className="container-page relative py-14 md:py-16 lg:py-18">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-4">
            <Link to="/" aria-label="OS Group home" className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2">
              <img src="/images/os-group-logo.png" alt="OS Group" className="h-14 w-auto max-w-[205px] object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#5d586b]">
              {general?.tagline || 'A diversified group of companies building across industries.'}
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-2.5">
                {socials.map(([Icon, href, label]) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd4eb] bg-white text-[#625d70] shadow-[0_4px_12px_rgba(82,58,128,0.05)] transition-colors hover:border-[#c9b7e7] hover:bg-[#f0e8fb] hover:text-[#7657b7]"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {groups.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#302b42]">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#5d586b] transition-colors hover:text-[#7657b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9]">
                      {label}
                      <ArrowUpRight size={13} className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#302b42]">Get in Touch</h2>
            <ul className="mt-5 space-y-4 text-sm text-[#5d586b]">
              <li className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee6fa] text-[#7657b7]"><MapPin size={15} /></span><span className="pt-1 leading-6">{general?.headquarters || 'Kathmandu, Nepal'}</span></li>
              <li className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee6fa] text-[#7657b7]"><Phone size={15} /></span><span className="pt-1 leading-6">{general?.phone || '+977-1-XXXXXXX'}</span></li>
              <li className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee6fa] text-[#7657b7]"><Mail size={15} /></span><span className="break-words pt-1 leading-6">{general?.email || 'info@osgroup.com'}</span></li>
            </ul>
            <Link to="/contact" className="group mt-6 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#7d5bc4] px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(125,91,196,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#6f4fb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6bd9] focus-visible:ring-offset-2">
              Contact the Group <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 h-px bg-[#e3dceb]" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-[#777184] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OS Group of Company. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/documents" className="font-semibold hover:text-[#7657b7]">Documents</Link>
          </div>
        </div>
      </AnimatedSection>
      <BackToTop />
    </footer>
  );
}
