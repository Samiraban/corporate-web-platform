import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Users,
  Globe2,
  Sparkles,
  MoveUpRight,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import SEO from '../../components/SEO';

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

const principles = [
  {
    number: '01',
    title: 'Independent Leadership',
    short: 'Each company',
    icon: Building2,
    text:
      'Each company operates with its own leadership and specialist expertise, allowing decisions to stay close to the people who understand the work best.',
  },
  {
    number: '02',
    title: 'Shared Standards',
    short: 'One standard',
    icon: ShieldCheck,
    text:
      'Group-wide standards for quality, ethics and client care create consistency across every company operating within the OS Group network.',
  },
  {
    number: '03',
    title: 'Decisions Close to Work',
    short: 'Closer decisions',
    icon: Users,
    text:
      'We believe strong decisions are made by people with direct knowledge of the situation, the client, the market and the work.',
  },
  {
    number: '04',
    title: 'Two-Way Accountability',
    short: 'Accountability',
    icon: Globe2,
    text:
      'Accountability runs both ways — from the group to each company and from each company back to the wider group.',
  },
];

const workingSteps = [
  {
    number: '01',
    title: 'Understand',
    text:
      'We begin by understanding the requirements, objectives, market and people involved.',
  },
  {
    number: '02',
    title: 'Align',
    text:
      'Specialist teams align their expertise with the wider standards and direction of OS Group.',
  },
  {
    number: '03',
    title: 'Deliver',
    text:
      'Focused teams deliver practical solutions with clear responsibility and attention to quality.',
  },
  {
    number: '04',
    title: 'Grow',
    text:
      'Long-term relationships create opportunities for continuous improvement and sustainable growth.',
  },
];

function Reveal({
  children,
  variants = revealUp,
  className = '',
  reducedMotion = false,
}) {
  return (
    <motion.div
      className={className}
      variants={reducedMotion ? undefined : variants}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedImage({
  src,
  alt,
  className = '',
  reducedMotion = false,
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        initial={reducedMotion ? false : { scale: 1.08 }}
        whileInView={reducedMotion ? undefined : { scale: 1 }}
        whileHover={reducedMotion ? undefined : { scale: 1.045 }}
        transition={{ duration: 1.1, ease }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />

      <motion.div
        initial={reducedMotion ? false : { width: 0 }}
        whileInView={reducedMotion ? undefined : { width: '34%' }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease,
        }}
        className="absolute bottom-0 left-0 h-[3px] bg-lavender-500"
      />
    </motion.div>
  );
}

export default function HowWeWork() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="How We Work"
        description="Discover how OS Group companies work together through independent leadership, shared standards, accountability and long-term relationships."
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden border-b border-lavender-100 bg-white">
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

            {/* LEFT */}
            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-lavender-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-700">
                <Sparkles size={13} aria-hidden="true" />
                Our approach
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900">
                How we
                <br />
                <span className="text-lavender-600">work.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                Independence with accountability — a way of working that
                allows OS Group companies to grow while maintaining the
                standards, relationships and direction that connect the group.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="#approach"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Explore our approach
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Work with us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div
              variants={reducedMotion ? undefined : revealRight}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 shadow-[0_20px_55px_rgba(87,67,130,0.1)] sm:min-h-[390px]"
            >
              <motion.img
                src="/images/os-group-team.jpg"
                alt="OS Group team working together"
                className="absolute inset-0 h-full w-full object-cover"
                initial={reducedMotion ? false : { scale: 1.07 }}
                animate={reducedMotion ? undefined : { scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/75 via-[#6f52ad]/10 to-white/5" />

              {/* FLOATING TOP CARD */}
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-5 top-5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-7 sm:top-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                  The OS Group way
                </p>

                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                  People. Expertise. Trust.
                </p>
              </motion.div>

              {/* FLOATING BOTTOM CARD */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 25,
                        }
                  }
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease,
                  }}
                  className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6"
                >
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                        How we work
                      </p>

                      <p className="mt-2 max-w-md font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                        Independent companies. One shared direction.
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-600 text-white sm:flex">
                      <ArrowRight size={18} aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BACKGROUND GLOW */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lavender-100/70 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-lavender-100/50 blur-3xl"
        />
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}

      <section
        id="approach"
        className="scroll-mt-24 bg-[#FCFBFF] py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                The OS Group model
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Independent companies.
                <br />
                <span className="text-lavender-600">
                  One shared direction.
                </span>
              </h2>
            </div>

            <div className="lg:max-w-2xl lg:justify-self-end">
              <p className="text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
                Each company in the group has its own leadership, expertise
                and understanding of its market. At the same time, every
                company operates within the wider standards and expectations
                of OS Group.
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-lavender-200 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                  <Check size={15} aria-hidden="true" />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                  Independence + accountability
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          VISUAL STORY
      ========================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

            <Reveal
              variants={revealLeft}
              reducedMotion={reducedMotion}
            >
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-lavender-200 shadow-[0_20px_55px_rgba(87,67,130,0.08)] sm:min-h-[540px]">
                <AnimatedImage
                  src="/images/os-group-office.jpg"
                  alt="OS Group workplace"
                  className="absolute inset-0 h-full w-full"
                  reducedMotion={reducedMotion}
                />

                <motion.div
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
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4,
                    duration: 0.7,
                    ease,
                  }}
                  className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-white/30 bg-black/35 p-5 backdrop-blur-md sm:bottom-7 sm:left-7"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-lavender-300">
                    Our approach
                  </p>

                  <p className="mt-2 font-serif text-2xl font-semibold text-white">
                    Close to the work.
                  </p>
                </motion.div>
              </div>
            </Reveal>

            <Reveal
              variants={revealRight}
              reducedMotion={reducedMotion}
            >
              <div className="lg:pl-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  Built to work together
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                  Structure gives us
                  <br />
                  <span className="text-lavender-600">
                    room to grow.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-ink-600">
                  The OS Group structure is designed to give each company
                  enough independence to respond to its clients and markets
                  while maintaining the consistency expected from the wider
                  group.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Specialist leadership',
                    'Shared quality standards',
                    'Clear responsibility',
                    'Long-term relationships',
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              x: -20,
                            }
                      }
                      whileInView={
                        reducedMotion
                          ? undefined
                          : {
                              opacity: 1,
                              x: 0,
                            }
                      }
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: reducedMotion ? 0 : index * 0.08,
                        ease,
                      }}
                      className="group flex items-center gap-4 border-b border-lavender-100 py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lavender-50 text-lavender-600 transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
                        <CheckCircle2 size={17} />
                      </div>

                      <span className="text-sm font-semibold text-ink-800">
                        {item}
                      </span>

                      <ArrowRight
                        size={16}
                        className="ml-auto text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lavender-600"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOUR STEPS
      ========================================================== */}

      <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
        <div className="container-page">

          <Reveal reducedMotion={reducedMotion}>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  Our process
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                  From understanding
                  <br />
                  <span className="text-lavender-600">
                    to delivery.
                  </span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-7 text-ink-600 lg:justify-self-end sm:text-lg">
                Our approach combines specialist knowledge with a clear,
                structured way of working — helping each company respond
                effectively while remaining connected to the wider group.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workingSteps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
                className="group relative overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white p-6 shadow-[0_10px_35px_rgba(87,67,130,0.055)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(87,67,130,0.11)] sm:p-7"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-lavender-50 transition-transform duration-500 group-hover:scale-[1.6]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl font-semibold text-lavender-300 transition-colors duration-300 group-hover:text-lavender-500">
                      {step.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-50 text-lavender-600 transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
                      <ArrowRight size={15} />
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-2xl font-semibold text-ink-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink-600">
                    {step.text}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                    <Check size={13} />
                    OS Group standard
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOUR PRINCIPLES
      ========================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">

          <Reveal reducedMotion={reducedMotion}>
            <div className="flex flex-col gap-5 border-b border-lavender-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  How the model works
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">
                  Four principles.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-ink-600 sm:text-right">
                The principles that keep our companies connected while
                allowing specialist teams to operate effectively.
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.div
                  key={principle.number}
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
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: reducedMotion ? 0 : index * 0.08,
                    ease,
                  }}
                  className="group border-b border-lavender-100"
                >
                  <div className="grid gap-5 px-1 py-7 sm:grid-cols-[70px_1fr_1.2fr_50px] sm:items-center sm:px-3">
                    <div className="font-serif text-3xl font-semibold text-lavender-300 transition-colors duration-300 group-hover:text-lavender-600">
                      {principle.number}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lavender-200 bg-lavender-50 text-lavender-600 transition-all duration-300 group-hover:border-lavender-500 group-hover:bg-lavender-600 group-hover:text-white">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                          {principle.short}
                        </p>

                        <h3 className="mt-1 font-serif text-xl font-semibold text-ink-900 sm:text-2xl">
                          {principle.title}
                        </h3>
                      </div>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-ink-600">
                      {principle.text}
                    </p>

                    <div className="hidden text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lavender-600 sm:block">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOUNTABILITY
      ========================================================== */}

      <section className="relative overflow-hidden bg-[#30254A] py-16 text-white sm:py-20 lg:py-24">

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="pointer-events-none absolute -right-40 top-[-180px] h-[520px] w-[520px] rounded-full border border-white/10"
        />

        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: -360,
                }
          }
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="pointer-events-none absolute -left-48 bottom-[-240px] h-[600px] w-[600px] rounded-full border border-lavender-300/10"
        />

        <div className="container-page relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            <Reveal
              variants={revealLeft}
              reducedMotion={reducedMotion}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-300">
                  Accountability
                </p>

                <div className="mt-6 h-px w-16 bg-lavender-400" />

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                  Independence works best when responsibility is clear.
                  Our model keeps accountability connected to both the
                  individual company and the wider OS Group.
                </p>
              </div>
            </Reveal>

            <Reveal
              variants={revealRight}
              reducedMotion={reducedMotion}
            >
              <div className="relative">
                <span className="absolute -left-5 -top-16 font-serif text-[9rem] leading-none text-white/[0.04] sm:text-[13rem]">
                  02
                </span>

                <blockquote className="relative font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Independence gives us
                  <span className="text-lavender-300">
                    {' '}
                    speed.
                  </span>
                  <br />
                  Accountability gives us
                  <span className="text-lavender-300">
                    {' '}
                    direction.
                  </span>
                </blockquote>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* =========================================================
          GLOBAL OPERATING VIEW
      ========================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">

            <Reveal
              variants={revealLeft}
              reducedMotion={reducedMotion}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  Built for growth
                </p>

                <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                  A structure that can
                  <br />
                  <span className="text-lavender-600">
                    move with opportunity.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-ink-600">
                  As OS Group expands across industries and markets, our
                  operating model is designed to preserve specialist knowledge
                  while creating a consistent group identity.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {[
                    'Specialisation',
                    'Consistency',
                    'Responsibility',
                    'Growth',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-lavender-200 bg-lavender-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lavender-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal
              variants={revealRight}
              reducedMotion={reducedMotion}
            >
              <div className="relative min-h-[400px] overflow-hidden rounded-[1.75rem] border border-lavender-200 shadow-[0_18px_50px_rgba(87,67,130,0.08)] sm:min-h-[500px]">
                <AnimatedImage
                  src="/images/os-group-global.jpg"
                  alt="OS Group global operations"
                  className="absolute inset-0 h-full w-full"
                  reducedMotion={reducedMotion}
                />

                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.75,
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.35,
                    ease,
                  }}
                  className="absolute bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md sm:bottom-7 sm:right-7 sm:h-24 sm:w-24"
                >
                  <Globe2
                    size={26}
                    className="text-lavender-300"
                  />
                </motion.div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

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
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[1.75rem] border border-lavender-200 bg-white px-6 py-10 shadow-[0_18px_55px_rgba(87,67,130,0.08)] sm:px-10 sm:py-12 lg:px-14"
          >
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  The OS Group way
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-5xl">
                  Independent in action.
                  <span className="text-lavender-600">
                    {' '}
                    United in purpose.
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
                  Our companies are different by design. What connects them
                  is the standard of work, responsibility and long-term
                  thinking expected across OS Group.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-lavender-600 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,173,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                Get in touch
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          END STRIP
      ========================================================== */}

      <section className="border-t border-lavender-100 bg-white py-7">
        <div className="container-page flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-500">
            How We Work
          </span>

          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
            <span>OS Group</span>
            <span className="text-lavender-500">•</span>
            <span>
              Independence · Accountability · Growth
            </span>
          </div>

        </div>
      </section>
    </main>
  );
}