import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Check,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';
import { Loading, EmptyState } from '../components/UI';

const TYPE_LABEL = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
  remote: 'Remote',
};

const ease = [0.16, 1, 0.3, 1];

const revealUp = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease,
    },
  },
};

const revealLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const blurReveal = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function ParallaxImage({
  src,
  alt = '',
  className = '',
  reducedMotion = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-24, 24]
  );

  const smoothY = useSpring(y, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      initial={reducedMotion ? false : { scale: 1.08 }}
      whileInView={reducedMotion ? undefined : { scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.1,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.035,
            }
      }
      className={`h-full w-full ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

function CareersHero({ reducedMotion }) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, 90]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -50]
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b border-lavender-100 bg-white"
    >
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT */}
          <motion.div
            style={{ y: contentY }}
            variants={reducedMotion ? undefined : stagger}
            initial={reducedMotion ? false : 'hidden'}
            animate={reducedMotion ? undefined : 'visible'}
            className="relative z-10"
          >
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-lavender-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-700"
            >
              <Sparkles size={13} aria-hidden="true" />
              People & opportunities
            </motion.div>

            <motion.h1
              variants={blurReveal}
              className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900"
            >
              Careers built
              <br />
              <span className="text-lavender-600">
                around people.
              </span>
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg"
            >
              Build your career across OS Group and its growing
              companies. Join a team where expertise, ambition and
              opportunity move forward together.
            </motion.p>

            <motion.div
              variants={revealUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#open-positions"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                Explore positions
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>

              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                Talk to us
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            variants={reducedMotion ? undefined : revealRight}
            initial={reducedMotion ? false : 'hidden'}
            animate={reducedMotion ? undefined : 'visible'}
            className="relative"
          >
            <div className="relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 shadow-[0_20px_55px_rgba(87,67,130,0.1)] sm:min-h-[500px]">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 scale-110"
              >
                <img
                  src="/images/careers.jpg"
                  alt="Careers at OS Group"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/55 via-transparent to-white/5" />

              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="absolute left-5 top-5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-7 sm:top-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                  Careers at OS Group
                </p>

                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                  Your next chapter.
                </p>
              </motion.div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                        Why join us
                      </p>

                      <p className="mt-2 max-w-md font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                        Grow with people who are building what comes next.
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-600 text-white sm:flex">
                      <Users size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-40 w-40 rounded-full bg-lavender-100 blur-3xl"
            />
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lavender-100/70 blur-3xl"
      />
    </section>
  );
}

function CareersIntro({ jobCount }) {
  return (
    <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={revealUp}
              className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600"
            >
              Our opportunities
            </motion.p>

            <motion.h2
              variants={blurReveal}
              className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl"
            >
              Careers that
              <br />
              <span className="text-lavender-600">
                move people forward.
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={revealUp}
            className="lg:max-w-2xl lg:justify-self-end"
          >
            <p className="text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
              We look for people who bring curiosity, expertise,
              ambition and a willingness to grow. Explore our
              current openings and find a role that fits your
              next chapter.
            </p>

            <div className="mt-7 flex items-center gap-4 border-t border-lavender-200 pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                <Briefcase size={16} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                {jobCount === 1
                  ? '1 open position'
                  : `${jobCount} open positions`}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function JobCard({ job, index, reducedMotion }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 25 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        ease,
        delay: reducedMotion ? 0 : index * 0.06,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="group border-t border-lavender-200 bg-white transition-all duration-300 last:border-b hover:bg-[#FCFBFF]"
    >
      <Link
        to={`/careers/${job.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-4"
        aria-label={`View ${job.position} position`}
      >
        <div className="grid gap-6 px-5 py-7 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:px-7 lg:px-9 lg:py-8">
          {/* NUMBER */}
          <div className="font-serif text-3xl font-semibold text-lavender-300">
            {number}
          </div>

          {/* DETAILS */}
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-ink-900 transition-colors duration-300 group-hover:text-lavender-600 sm:text-3xl">
              {job.position}
            </h3>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
              {job.department && (
                <span className="flex items-center gap-2">
                  <Briefcase
                    size={14}
                    className="text-lavender-600"
                  />
                  {job.department}
                </span>
              )}

              {job.location && (
                <span className="flex items-center gap-2">
                  <MapPin
                    size={14}
                    className="text-lavender-600"
                  />
                  {job.location}
                </span>
              )}

              <span className="flex items-center gap-2">
                <Clock
                  size={14}
                  className="text-lavender-600"
                />
                {TYPE_LABEL[job.employmentType] ||
                  job.employmentType}
              </span>
            </div>
          </div>

          {/* ARROW */}
          <motion.div
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.08,
                  }
            }
            className="flex h-12 w-12 items-center justify-center rounded-full border border-lavender-200 text-ink-700 transition-all duration-300 group-hover:border-lavender-500 group-hover:bg-lavender-600 group-hover:text-white"
          >
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{
            duration: 0.4,
            ease,
          }}
          className="h-[2px] origin-left bg-lavender-600"
        />
      </Link>
    </motion.article>
  );
}

function WhyJoinUs({ reducedMotion }) {
  const items = [
    {
      number: '01',
      title: 'People',
      text: 'Work with people who value expertise, collaboration and meaningful contribution.',
    },
    {
      number: '02',
      title: 'Growth',
      text: 'Build your skills and experience through opportunities across a growing group.',
    },
    {
      number: '03',
      title: 'Opportunity',
      text: 'Take on meaningful work and create a career path that keeps moving forward.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <motion.div
            variants={reducedMotion ? undefined : revealLeft}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
              Why join us
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
              A place to
              <br />
              <span className="text-lavender-600">
                grow.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-ink-600 sm:text-base">
              OS Group brings together people and companies with
              different areas of expertise, creating opportunities
              to learn, contribute and move forward.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item.number}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                whileInView={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: reducedMotion ? 0 : index * 0.1,
                  ease,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                className="rounded-2xl border border-lavender-200 bg-[#FCFBFF] p-6 shadow-[0_8px_30px_rgba(87,67,130,0.045)]"
              >
                <span className="font-serif text-3xl font-semibold text-lavender-500">
                  {item.number}
                </span>

                <h3 className="mt-5 text-lg font-bold text-ink-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-ink-600">
                  {item.text}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lavender-600">
                  <Check size={14} />
                  OS Group
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerCulture({ reducedMotion }) {
  return (
    <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            variants={reducedMotion ? undefined : revealLeft}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative min-h-[380px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 sm:min-h-[500px]"
          >
            <ParallaxImage
              src="/images/os-group-office.jpg"
              alt="OS Group workplace"
              reducedMotion={reducedMotion}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/35 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
              <div className="rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                  Our culture
                </p>

                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                  People make the group.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={reducedMotion ? undefined : revealRight}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
              Life at OS Group
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
              Bring your
              <br />
              <span className="text-lavender-600">
                perspective.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
              We believe different experiences and perspectives
              make businesses stronger. Across our companies,
              people contribute their skills while continuing to
              learn and grow.
            </p>

            <div className="mt-8 border-t border-lavender-200 pt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-serif text-3xl font-semibold text-ink-900">
                    People
                  </p>

                  <p className="mt-2 text-sm leading-6 text-ink-600">
                    A group built around people and expertise.
                  </p>
                </div>

                <div>
                  <p className="font-serif text-3xl font-semibold text-ink-900">
                    Progress
                  </p>

                  <p className="mt-2 text-sm leading-6 text-ink-600">
                    Opportunities to keep learning and moving forward.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CareerCTA({ reducedMotion }) {
  return (
    <section className="relative overflow-hidden bg-lavender-50 py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lavender-200/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-lavender-100 blur-3xl"
      />

      <div className="container-page relative z-10">
        <motion.div
          variants={reducedMotion ? undefined : revealUp}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="rounded-[1.75rem] border border-lavender-200 bg-white px-6 py-10 shadow-[0_18px_55px_rgba(87,67,130,0.08)] sm:px-10 sm:py-12 lg:px-14"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                Your next chapter
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-5xl">
                Find an opportunity that
                <span className="text-lavender-600">
                  {' '}
                  moves you forward.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
                Explore our open positions and discover where
                your experience and ambitions can contribute.
              </p>
            </div>

            <a
              href="#open-positions"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-lavender-600 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,173,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
            >
              View positions

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    let active = true;

    api
      .get('/careers/jobs')
      .then((res) => {
        if (!active) return;

        setJobs(
          Array.isArray(res.data?.data)
            ? res.data.data
            : []
        );
      })
      .catch((error) => {
        console.error('Failed to load careers:', error);

        if (active) {
          setJobs([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="Careers"
        description="Explore career opportunities across the OS Group of Company network."
      />

      {/* PAGE PROGRESS */}
      {!reducedMotion && (
        <motion.div
          style={{
            scaleX: pageProgress,
          }}
          className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-lavender-600"
        />
      )}

      {/* HERO */}
      <CareersHero reducedMotion={reducedMotion} />

      {/* INTRO */}
      <CareersIntro jobCount={jobs.length} />

      {/* OPEN POSITIONS */}
      <section
        id="open-positions"
        className="scroll-mt-24 bg-lavender-50/55 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mb-10 flex flex-col gap-5 border-b border-lavender-200 pb-7 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lavender-600">
                Specialist opportunities
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">
                Open positions.
              </h2>
            </div>

            {!loading && jobs.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-serif text-4xl font-semibold text-lavender-300">
                  {String(jobs.length).padStart(2, '0')}
                </span>

                <span className="text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-ink-500">
                  Opportunities
                  <br />
                  across the group
                </span>
              </div>
            )}
          </motion.div>

          {loading && (
            <div className="overflow-hidden rounded-[1.5rem] border border-lavender-200 bg-white">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border-b border-lavender-100 last:border-b-0"
                >
                  <div className="grid gap-4 px-6 py-8 sm:grid-cols-[70px_1fr_auto] sm:items-center">
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.85, 0.4],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: item * 0.1,
                      }}
                      className="h-8 w-10 rounded bg-lavender-100"
                    />

                    <div className="space-y-3">
                      <motion.div
                        animate={{
                          opacity: [0.4, 0.85, 0.4],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: item * 0.1,
                        }}
                        className="h-7 w-2/3 rounded bg-lavender-100"
                      />

                      <div className="flex gap-3">
                        <div className="h-3 w-24 rounded bg-lavender-50" />
                        <div className="h-3 w-24 rounded bg-lavender-50" />
                      </div>
                    </div>

                    <div className="h-11 w-11 rounded-full bg-lavender-50" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-lavender-200 bg-white px-6 text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender-50 text-lavender-600">
                  <Briefcase size={24} />
                </div>

                <h3 className="mt-5 font-serif text-3xl font-semibold text-ink-900">
                  No open positions right now
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-ink-600">
                  Check back soon, or send us your CV through
                  the contact page.
                </p>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-lavender-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700"
                >
                  Contact us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {!loading && jobs.length > 0 && (
            <div className="overflow-hidden rounded-[1.5rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.05)]">
              {jobs.map((job, index) => (
                <JobCard
                  key={job._id || job.slug || index}
                  job={job}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY JOIN */}
      <WhyJoinUs reducedMotion={reducedMotion} />

      {/* CULTURE IMAGE + STORY */}
      <CareerCulture reducedMotion={reducedMotion} />

      {/* CTA */}
      <CareerCTA reducedMotion={reducedMotion} />
    </main>
  );
}