import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  MapPin,
  MoveUpRight,
  Play,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';

const ease = [0.16, 1, 0.3, 1];

const STATUS_LABEL = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85',
];

/* =========================================================
   ANIMATIONS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -55,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 55,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   ANIMATED SECTION LABEL
========================================================= */

function SectionLabel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease }}
      className="flex items-center gap-3"
    >
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 34 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="h-px bg-brass-500"
      />

      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-brass-600">
        {children}
      </span>
    </motion.div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project, index }) {
  const image =
    project.coverImage ||
    project.gallery?.[0]?.url ||
    fallbackImages[index % fallbackImages.length];

  const number = String(index + 1).padStart(2, '0');

  const status =
    STATUS_LABEL[project.status] ||
    project.status ||
    'Project';

  return (
    <motion.article
      variants={index % 2 === 0 ? fadeLeft : fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="group"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="
          relative
          block
          overflow-hidden
          rounded-2xl
          border
          border-ink-200
          bg-white
          shadow-[0_8px_30px_rgba(23,32,51,0.05)]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-brass-300
          hover:shadow-[0_20px_55px_rgba(23,32,51,0.12)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brass-500
          focus-visible:ring-offset-4
        "
      >
        {/* IMAGE */}

        <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
          <motion.img
            src={image}
            alt={project.name}
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.06 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease,
            }}
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-ink-900/60
              via-ink-900/5
              to-transparent
              opacity-80
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* Number */}

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="absolute left-5 top-5 z-10"
          >
            <span
              className="
                font-serif
                text-4xl
                font-semibold
                text-white/90
                drop-shadow-md
                sm:text-5xl
              "
            >
              {number}
            </span>
          </motion.div>

          {/* STATUS */}

          <div className="absolute right-5 top-5 z-10">
            <span
              className="
                inline-flex
                rounded-full
                border
                border-white/30
                bg-white/90
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-ink-800
                shadow-sm
                backdrop-blur-md
              "
            >
              {status}
            </span>
          </div>

          {/* VIDEO */}

          {project.video && (
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="
                absolute
                bottom-5
                right-5
                z-10
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/50
                bg-white/90
                text-brass-600
                shadow-lg
                backdrop-blur-md
              "
            >
              <Play
                size={14}
                fill="currentColor"
                aria-hidden="true"
              />
            </motion.div>
          )}

          {/* CENTER HOVER BUTTON */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileHover={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              absolute
              left-1/2
              top-1/2
              z-20
              flex
              h-14
              w-14
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-brass-500
              text-white
              shadow-xl
            "
          >
            <MoveUpRight size={20} />
          </motion.div>

          {/* GOLD IMAGE LINE */}

          <motion.div
            initial={{
              width: '22%',
            }}
            whileHover={{
              width: '55%',
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="
              absolute
              bottom-0
              left-0
              z-20
              h-1
              bg-brass-500
            "
          />
        </div>

        {/* CONTENT */}

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-brass-500" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-brass-600
              "
            >
              {project.category || 'Project'}
            </span>
          </div>

          <h3
            className="
              mt-4
              font-serif
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.02em]
              text-ink-900
              transition-colors
              duration-300
              group-hover:text-brass-600
              sm:text-3xl
            "
          >
            {project.name}
          </h3>

          {(project.client || project.location) && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
              {project.client && (
                <span className="font-medium">
                  {project.client}
                </span>
              )}

              {project.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={12}
                    aria-hidden="true"
                  />

                  {project.location}
                </span>
              )}
            </div>
          )}

          {project.description && (
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-ink-600">
              {project.description}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-ink-200 pt-5">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-ink-500
              "
            >
              View project
            </span>

            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="text-brass-600"
            >
              <ArrowRight size={18} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================================
   FEATURED PROJECT
========================================================= */

function FeaturedProject({ project }) {
  if (!project) return null;

  const image =
    project.coverImage ||
    project.gallery?.[0]?.url ||
    fallbackImages[0];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      variants={fadeUp}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="
          group
          relative
          block
          overflow-hidden
          rounded-3xl
          border
          border-ink-200
          bg-white
          shadow-[0_12px_45px_rgba(23,32,51,0.08)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_25px_70px_rgba(23,32,51,0.14)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brass-500
          focus-visible:ring-offset-4
        "
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          {/* IMAGE */}

          <div className="relative min-h-[360px] overflow-hidden bg-ink-100 sm:min-h-[480px] lg:min-h-[590px]">
            <motion.img
              src={image}
              alt={project.name}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
              initial={{
                scale: 1.1,
              }}
              whileInView={{
                scale: 1,
              }}
              whileHover={{
                scale: 1.045,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.4,
                ease,
              }}
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-ink-900/45
                via-transparent
                to-transparent
              "
            />

            {/* Featured badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8"
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/40
                  bg-white/90
                  px-4
                  py-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-ink-800
                  shadow-md
                  backdrop-blur-md
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
                Featured project
              </span>
            </motion.div>

            {/* Floating image arrow */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              whileHover={{
                rotate: 45,
                scale: 1.08,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                absolute
                right-6
                top-6
                z-10
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-ink-900
                shadow-xl
                sm:right-8
                sm:top-8
              "
            >
              <MoveUpRight size={18} />
            </motion.div>

            {/* Image bottom label */}

            <div className="absolute bottom-6 left-6 z-10 sm:bottom-8 sm:left-8">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-white drop-shadow-md">
                OS Group Portfolio
              </span>
            </div>
          </div>

          {/* CONTENT */}

          <div
            className="
              relative
              flex
              flex-col
              justify-center
              bg-white
              p-7
              sm:p-10
              lg:p-12
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-40
                w-40
                rounded-full
                bg-brass-400/5
                blur-3xl
              "
            />

            <div className="relative">
              <SectionLabel>
                Featured work
              </SectionLabel>

              <h2
                className="
                  mt-5
                  font-serif
                  text-4xl
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.035em]
                  text-ink-900
                  sm:text-5xl
                "
              >
                {project.name}
              </h2>

              {(project.client || project.location) && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-500">
                  {project.client && (
                    <span className="font-medium">
                      {project.client}
                    </span>
                  )}

                  {project.location && (
                    <span className="flex items-center gap-2">
                      <MapPin
                        size={14}
                        className="text-brass-600"
                      />

                      {project.location}
                    </span>
                  )}
                </div>
              )}

              {project.description && (
                <p
                  className="
                    mt-7
                    max-w-xl
                    text-base
                    leading-8
                    text-ink-600
                  "
                >
                  {project.description}
                </p>
              )}

              <div className="mt-9 h-px w-full bg-ink-200" />

              <div className="mt-7 flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-ink-500
                  "
                >
                  Explore project
                </span>

                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brass-500 text-white shadow-lg"
                >
                  <ArrowRight size={17} />
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated gold border */}

        <motion.div
          initial={{
            width: '18%',
          }}
          whileHover={{
            width: '50%',
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="
            absolute
            bottom-0
            left-0
            h-1
            bg-brass-500
          "
        />
      </Link>
    </motion.div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      setLoading(true);

      try {
        const query = status
          ? `&status=${status}`
          : '';

        const response = await api.get(
          `/projects?publishStatus=published&limit=100${query}`
        );

        if (!mounted) return;

        const data =
          response?.data?.data ||
          response?.data ||
          [];

        setProjects(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          'Failed to load projects:',
          error
        );

        if (mounted) {
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, [status]);

  const featuredProject =
    projects.find(
      (project) => project.isFeatured
    ) || projects[0];

  const remainingProjects =
    featuredProject
      ? projects.filter(
          (project) =>
            project._id !==
            featuredProject._id
        )
      : [];

  return (
    <div className="overflow-hidden bg-white text-ink-900">
      <SEO
        title="Projects"
        description="Explore projects delivered across the OS Group of Company portfolio."
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-white">
        <div className="container-page relative">
          <div className="grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
            {/* TEXT */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="relative z-10 pt-8 lg:pt-0"
            >
              <SectionLabel>
                Our Portfolio
              </SectionLabel>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease,
                }}
                className="
                  mt-6
                  max-w-3xl
                  font-serif
                  text-5xl
                  font-semibold
                  leading-[0.94]
                  tracking-[-0.045em]
                  text-ink-900
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[5.6rem]
                "
              >
                Projects
                <br />

                <span className="text-brass-600">
                  brought to life.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.4,
                  ease,
                }}
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-8
                  text-ink-600
                  sm:text-lg
                "
              >
                Explore selected projects delivered
                across the OS Group network — from
                completed work to projects currently
                underway and future developments.
              </motion.p>

              {/* Stats */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.65,
                  ease,
                }}
                className="
                  mt-9
                  grid
                  max-w-md
                  grid-cols-2
                  border-y
                  border-ink-200
                "
              >
                <div className="py-5 pr-5">
                  <p className="font-serif text-3xl font-semibold text-ink-900">
                    {loading
                      ? '—'
                      : projects.length}
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-500">
                    Published projects
                  </p>
                </div>

                <div className="border-l border-ink-200 py-5 pl-5">
                  <p className="font-serif text-3xl font-semibold text-ink-900">
                    {loading
                      ? '—'
                      : projects.filter(
                          (project) =>
                            project.status ===
                            'completed'
                        ).length}
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-500">
                    Completed
                  </p>
                </div>
              </motion.div>

              {/* Scroll cue */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1,
                  duration: 0.7,
                }}
                className="mt-9 flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    y: [0, 7, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-ink-200
                    bg-white
                    text-brass-600
                  "
                >
                  <ArrowDown size={15} />
                </motion.div>

                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink-500">
                  Explore our work
                </span>
              </motion.div>
            </motion.div>

            {/* HERO IMAGE */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageReveal}
              className="relative"
            >
              <div
                className="
                  relative
                  aspect-[4/4.5]
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-ink-200
                  bg-ink-100
                  shadow-[0_25px_70px_rgba(23,32,51,0.12)]
                  lg:aspect-[4/4.6]
                "
              >
                <motion.img
                  src="/images/os-group-global.jpg"
                  alt="OS Group projects and global operations"
                  className="h-full w-full object-cover"
                  initial={{
                    scale: 1.1,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    ease,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />

                {/* Floating label */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease,
                  }}
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    rounded-2xl
                    border
                    border-white/30
                    bg-white/90
                    p-5
                    shadow-xl
                    backdrop-blur-md
                    sm:bottom-8
                    sm:left-8
                    sm:right-auto
                    sm:max-w-sm
                  "
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brass-600">
                    OS Group
                  </p>

                  <p className="mt-2 font-serif text-xl font-semibold text-ink-900">
                    Progress made visible.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink-600">
                    Projects shaped by specialist
                    companies, people and expertise.
                  </p>
                </motion.div>
              </div>

              {/* Decorative circle */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  hidden
                  h-28
                  w-28
                  rounded-full
                  border
                  border-brass-300
                  lg:block
                "
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brass-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="relative overflow-hidden bg-ink-50 py-20 sm:py-28">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={staggerContainer}
            className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>
                Our work
              </SectionLabel>

              <h2
                className="
                  mt-5
                  max-w-xl
                  font-serif
                  text-4xl
                  font-semibold
                  leading-tight
                  tracking-[-0.03em]
                  text-ink-900
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                From vision.
                <br />

                <span className="text-ink-500">
                  To delivery.
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="lg:ml-auto lg:max-w-2xl"
            >
              <p className="text-lg leading-8 text-ink-600 sm:text-xl">
                Our projects reflect the capabilities,
                specialist expertise and operational
                strength of companies across the OS
                Group network.
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-ink-200 pt-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-50 text-brass-600 ring-1 ring-brass-200">
                  <Sparkles
                    size={16}
                    aria-hidden="true"
                  />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500">
                  {loading
                    ? 'Loading portfolio'
                    : `${projects.length} published projects`}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PORTFOLIO
      ====================================================== */}

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="mb-10"
          >
            <SectionLabel>
              Project portfolio
            </SectionLabel>

            <h2
              className="
                mt-5
                max-w-3xl
                font-serif
                text-4xl
                font-semibold
                leading-tight
                tracking-[-0.03em]
                text-ink-900
                sm:text-5xl
              "
            >
              Work that moves
              <span className="text-brass-600">
                {' '}
                forward.
              </span>
            </h2>
          </motion.div>

          {/* FILTERS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="mb-12 flex flex-wrap gap-2"
          >
            {[
              '',
              'completed',
              'ongoing',
              'upcoming',
            ].map((value) => (
              <button
                key={value || 'all'}
                type="button"
                onClick={() =>
                  setStatus(value)
                }
                className={`
                  relative
                  min-h-[42px]
                  overflow-hidden
                  rounded-full
                  border
                  px-5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brass-500
                  focus-visible:ring-offset-2
                  ${
                    status === value
                      ? 'border-brass-500 bg-brass-500 text-white shadow-md'
                      : 'border-ink-200 bg-white text-ink-600 hover:border-brass-400 hover:text-brass-600'
                  }
                `}
              >
                <AnimatePresence>
                  {status === value && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-brass-500"
                      transition={{
                        duration: 0.3,
                        ease,
                      }}
                    />
                  )}
                </AnimatePresence>

                <span className="relative z-10">
                  {value
                    ? STATUS_LABEL[value]
                    : 'All Projects'}
                </span>
              </button>
            ))}
          </motion.div>

          {/* LOADING */}

          {loading && (
            <div className="space-y-8">
              {[1, 2].map((item) => (
                <motion.div
                  key={item}
                  animate={{
                    opacity: [0.45, 0.8, 0.45],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.15,
                  }}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-ink-200
                    bg-ink-50
                  "
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="min-h-[350px] bg-ink-100" />

                    <div className="space-y-5 p-8">
                      <div className="h-3 w-24 rounded-full bg-ink-200" />
                      <div className="h-12 w-3/4 rounded-lg bg-ink-200" />
                      <div className="h-4 w-full rounded bg-ink-200" />
                      <div className="h-4 w-5/6 rounded bg-ink-200" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* EMPTY */}

          {!loading && projects.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                flex
                min-h-[380px]
                items-center
                justify-center
                rounded-3xl
                border
                border-ink-200
                bg-ink-50
                text-center
              "
            >
              <div className="px-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brass-200 bg-brass-50 text-brass-600">
                  <Sparkles size={22} />
                </div>

                <h3 className="mt-6 font-serif text-3xl font-semibold text-ink-900">
                  No projects to show
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink-600">
                  There are currently no published
                  projects matching this filter.
                </p>
              </div>
            </motion.div>
          )}

          {/* FEATURED + REMAINING */}

          {!loading && projects.length > 0 && (
            <>
              <FeaturedProject
                project={featuredProject}
              />

              {remainingProjects.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.08,
                  }}
                  variants={staggerContainer}
                  className="mt-8 grid gap-7 lg:grid-cols-2"
                >
                  {remainingProjects.map(
                    (project, index) => (
                      <ProjectCard
                        key={
                          project._id ||
                          project.slug ||
                          index
                        }
                        project={project}
                        index={index}
                      />
                    )
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-ink-50 py-24 sm:py-32">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-ink-200
              bg-white
              px-7
              py-16
              text-center
              shadow-[0_15px_50px_rgba(23,32,51,0.07)]
              sm:px-12
              sm:py-20
            "
          >
            {/* Decorative circle */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-80
                w-80
                rounded-full
                border
                border-brass-200
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                pointer-events-none
                absolute
                -bottom-40
                -left-40
                h-96
                w-96
                rounded-full
                border
                border-ink-200
              "
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              <SectionLabel>
                Build what comes next
              </SectionLabel>

              <h2
                className="
                  mt-6
                  font-serif
                  text-4xl
                  font-semibold
                  leading-tight
                  tracking-[-0.03em]
                  text-ink-900
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Every project starts
                <br />

                <span className="text-brass-600">
                  with a vision.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ink-600 sm:text-base">
                Discover the companies, services
                and expertise behind the OS Group
                portfolio.
              </p>

              <Link
                to="/contact"
                className="
                  group
                  mt-9
                  inline-flex
                  min-h-[48px]
                  items-center
                  gap-3
                  rounded-full
                  bg-brass-500
                  px-7
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-[0_10px_25px_rgba(200,146,22,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-brass-600
                  hover:shadow-[0_15px_35px_rgba(200,146,22,0.28)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brass-500
                  focus-visible:ring-offset-4
                "
              >
                <span>
                  Start a conversation
                </span>

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}