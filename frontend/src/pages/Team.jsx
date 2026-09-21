import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Linkedin, Mail, MoveUpRight, Sparkles, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '../services/api';
import SEO from '../components/SEO';
import { Loading, EmptyState } from '../components/UI';

const ease = [0.16, 1, 0.3, 1];

const revealLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

const revealRight = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

function LeadershipCard({ member, index, reducedMotion }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={reducedMotion ? undefined : index % 2 === 0 ? revealLeft : revealRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease }}
      className="group overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.07)]"
    >
      <div className="relative aspect-[4/4.5] overflow-hidden bg-lavender-50">
        <motion.img
          src={member.photo || '/images/leadership.jpg'}
          alt={member.name || 'OS Group leader'}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={reducedMotion ? undefined : { scale: 1.045 }}
          transition={{ duration: 0.65, ease }}
          onError={(event) => {
            if (event.currentTarget.src.endsWith('/images/leadership.jpg')) return;
            event.currentTarget.src = '/images/leadership.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/70 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-sm font-bold text-lavender-800 shadow-sm backdrop-blur-sm">
          {number}
        </div>

        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-lavender-800 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:rotate-6">
          <MoveUpRight size={17} aria-hidden="true" />
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-200">
            Leadership
          </div>
          <div className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">
            {member.name}
          </div>
          <div className="mt-1 text-sm text-white/75">
            {member.designation || 'Leadership'}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
          <span className="h-px w-7 bg-lavender-300" />
          OS Group leadership
        </div>

        {member.bio && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-600">
            {member.bio}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-lavender-100 pt-5">
          <div className="flex items-center gap-2">
            {member.socialLinks?.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`LinkedIn - ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-lavender-200 bg-lavender-50 text-lavender-700 transition-colors hover:bg-lavender-600 hover:text-white"
              >
                <Linkedin size={15} />
              </a>
            )}
            {member.socialLinks?.email && (
              <a
                href={`mailto:${member.socialLinks.email}`}
                aria-label={`Email - ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-lavender-200 bg-lavender-50 text-lavender-700 transition-colors hover:bg-lavender-600 hover:text-white"
              >
                <Mail size={15} />
              </a>
            )}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-50 text-lavender-700 transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    api
      .get('/team?isLeadership=true&status=published&limit=100&sort=order')
      .then((response) => {
        if (!mounted) return;
        const data = response?.data?.data || response?.data || [];
        setMembers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Failed to load leadership:', error);
        if (mounted) setMembers([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="Leadership"
        description="Meet the people guiding OS Group of Company and its subsidiaries."
      />

      {/* HERO — same clean format as Services */}
      <section className="relative overflow-hidden border-b border-lavender-100 bg-white">
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-lavender-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-700">
                <Sparkles size={13} aria-hidden="true" />
                Our leadership
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900">
                People who
                <br />
                <span className="text-lavender-600">lead with purpose.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                Meet the people guiding OS Group and its companies, bringing experience, perspective and clear direction to the work we do.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#leadership"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Meet the team
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Contact us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={reducedMotion ? undefined : revealRight}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 shadow-[0_20px_55px_rgba(87,67,130,0.1)] sm:min-h-[390px]"
            >
              <motion.img
                src="/images/leadership.jpg"
                alt="OS Group leadership"
                className="absolute inset-0 h-full w-full object-cover"
                initial={reducedMotion ? false : { scale: 1.06 }}
                animate={reducedMotion ? undefined : { scale: 1 }}
                transition={{ duration: 1.2, ease }}
                onError={(event) => {
                  event.currentTarget.src = '/images/os-group-leadership.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-[#6f52ad]/10 to-white/5" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5 sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-200">
                    OS Group
                  </div>
                  <div className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                    Leadership &amp; direction
                  </div>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/90 text-lavender-700 sm:flex">
                  <Users size={19} aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={reducedMotion ? undefined : revealUp}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
              <span className="h-px w-7 bg-lavender-300" />
              Our people
            </div>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.035em] text-ink-900 sm:text-5xl lg:text-6xl">
              Experience,
              <br />
              <span className="text-lavender-600">perspective &amp; purpose.</span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-7 text-ink-600 sm:text-lg">
              Our leadership brings together different experiences and areas of expertise to support responsible growth, strong decision-making and long-term value across the OS Group network.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-lavender-700">
              <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-lavender-50 px-3">
                {members.length}
              </span>
              {members.length === 1 ? 'Leader' : 'Leaders'}
            </div>
          </div>
        </motion.div>
      </section>

      {/* LEADERSHIP GRID */}
      <section id="leadership" className="container-page pb-20 sm:pb-24 lg:pb-28">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
              <span className="h-px w-7 bg-lavender-300" />
              Meet the team
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-4xl lg:text-5xl">
              The people behind OS Group.
            </h2>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : members.length === 0 ? (
          <EmptyState title="Leadership profiles coming soon" />
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {members.map((member, index) => (
              <LeadershipCard
                key={member._id || member.id || `${member.name}-${index}`}
                member={member}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        )}
      </section>

      {/* SIMPLE CTA — same light design system */}
      <section className="border-t border-lavender-100 bg-lavender-50">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[1.75rem] border border-lavender-200 bg-white px-6 py-10 shadow-[0_12px_40px_rgba(87,67,130,0.06)] sm:px-10 lg:px-14 lg:py-12"
          >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
                  <span className="h-px w-7 bg-lavender-300" />
                  Work with OS Group
                </div>
                <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-4xl">
                  Explore our companies, careers and opportunities.
                </h2>
              </div>
              <Link
                to="/contact"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-lavender-600 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                Get in touch
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
