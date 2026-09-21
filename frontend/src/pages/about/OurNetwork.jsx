import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Globe2,
  MapPin,
  MoveUpRight,
  Sparkles,
  Check,
  Users,
  Network,
  BriefcaseBusiness,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import api from '../../services/api';
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

const networkPrinciples = [
  {
    number: '01',
    title: 'Specialist companies',
    text:
      'Each company brings focused expertise, experienced leadership and a clear understanding of its own market.',
    icon: BriefcaseBusiness,
  },
  {
    number: '02',
    title: 'Shared standards',
    text:
      'The companies remain connected through shared expectations around quality, responsibility and client relationships.',
    icon: Check,
  },
  {
    number: '03',
    title: 'Connected expertise',
    text:
      'Different capabilities create a wider network where knowledge and experience can move across the group.',
    icon: Network,
  },
  {
    number: '04',
    title: 'Long-term growth',
    text:
      'The network is designed to support sustainable relationships, new opportunities and continued development.',
    icon: Globe2,
  },
];

/* =========================================================
   COMPANY CARD
========================================================= */

function CompanyCard({ company, index, reducedMotion }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={reducedMotion ? undefined : index % 2 === 0 ? revealLeft : revealRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -7,
            }
      }
      className="group overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.07)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(87,67,130,0.13)]"
    >
      <Link
        to={`/companies/${company.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-4"
        aria-label={`Explore ${company.name}`}
      >
        {/* IMAGE */}
        <div className="relative aspect-[16/9] overflow-hidden bg-lavender-50">
          {company.image ? (
            <motion.img
              src={company.image}
              alt={company.name}
              loading="lazy"
              className="h-full w-full object-cover"
              initial={
                reducedMotion
                  ? false
                  : {
                      scale: 1.03,
                    }
              }
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.055,
                    }
              }
              transition={{
                duration: 0.7,
                ease,
              }}
            />
          ) : company.logo ? (
            <div className="flex h-full items-center justify-center bg-[#F7F4FC] p-10">
              <motion.img
                src={company.logo}
                alt={`${company.name} logo`}
                className="max-h-32 max-w-[72%] object-contain"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.06,
                      }
                }
                transition={{
                  duration: 0.45,
                  ease,
                }}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-lavender-50">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lavender-200 bg-white text-lavender-600">
                <Building2 size={30} />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />

          {/* NUMBER */}
          <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-sm font-bold text-lavender-800 shadow-sm backdrop-blur-sm sm:left-6 sm:top-6">
            {number}
          </div>

          {/* ARROW */}
          <motion.div
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-lavender-800 shadow-sm backdrop-blur-sm sm:right-6 sm:top-6"
            whileHover={
              reducedMotion
                ? undefined
                : {
                    rotate: 8,
                    scale: 1.06,
                  }
            }
          >
            <MoveUpRight size={17} aria-hidden="true" />
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-7 lg:p-8">
          {company.logo && company.image && (
            <div className="mb-5 flex h-9 items-center">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="max-h-full max-w-[175px] object-contain object-left"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
            <span className="h-px w-7 bg-lavender-300" />
            OS Group company
          </div>

          <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink-900 sm:text-3xl">
            {company.name}
          </h3>

          {company.tagline && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-600 sm:text-[15px]">
              {company.tagline}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-lavender-100 pt-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-lavender-700">
              Explore company
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-50 text-lavender-700 transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function OurNetwork() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useReducedMotion();

  /* =========================================================
     FETCH COMPANIES
  ========================================================== */

  useEffect(() => {
    let mounted = true;

    api
      .get('/companies?status=published&limit=100&sort=order')
      .then((response) => {
        if (!mounted) return;

        const data = response?.data?.data || response?.data || [];

        setCompanies(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Failed to load companies:', error);

        if (mounted) {
          setCompanies([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="Our Network"
        description="Discover the specialist companies that make up the OS Group network and the expertise they bring across markets."
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden border-b border-lavender-100 bg-white">
       <div className="container-page relative py-8 sm:py-12 lg:py-14">
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
                Our network
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900">
                Our
                <br />
                <span className="text-lavender-600">
                  network.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                Specialist companies connected through shared standards,
                experienced leadership and a wider vision for sustainable
                growth.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="#companies"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Meet our companies
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Connect with us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={reducedMotion ? undefined : revealRight}
              initial={reducedMotion ? false : 'hidden'}
              animate={reducedMotion ? undefined : 'visible'}
              className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 shadow-[0_20px_55px_rgba(87,67,130,0.1)] sm:min-h-[390px]"
            >
              <motion.img
                src="/images/os-group-global.jpg"
                alt="OS Group global company network"
                className="absolute inset-0 h-full w-full object-cover"
                initial={
                  reducedMotion
                    ? false
                    : {
                        scale: 1.06,
                      }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1,
                      }
                }
                transition={{
                  duration: 1.2,
                  ease,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/70 via-[#6f52ad]/10 to-white/5" />

              {/* TOP CARD */}
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
                  Across the group
                </p>

                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                  Expertise. People. Connection.
                </p>
              </motion.div>

              {/* BOTTOM CARD */}
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
                    delay: 0.45,
                    ease,
                  }}
                  className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6"
                >
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                        Our network
                      </p>

                      <p className="mt-2 max-w-md font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                        Different companies. One wider group.
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-600 text-white sm:flex">
                      <Globe2 size={18} aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

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

      <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
          >
            <div>
             <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
  Our companies
</p>

<h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
  Meet our
  <br />
  <span className="text-lavender-600">
    companies.
  </span>
</h2>
            </div>

            <div className="lg:max-w-2xl lg:justify-self-end">
              <p className="text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
                OS Group brings together companies with their own expertise,
                leadership and market focus. Together, they form a wider
                network built around shared standards, responsibility and
                long-term growth.
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-lavender-200 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                  <Network size={15} aria-hidden="true" />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                  Connected expertise
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          NETWORK PRINCIPLES
      ========================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">

          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                What connects us
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Built from
                <br />
                <span className="text-lavender-600">
                  specialists.
                </span>
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-ink-600 lg:justify-self-end sm:text-lg">
              The network gives each company room to focus on what it does
              best while maintaining the connection and consistency of the
              wider OS Group.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {networkPrinciples.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
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
                    amount: 0.12,
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
                  className="group relative overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-[#FCFBFF] p-6 shadow-[0_10px_35px_rgba(87,67,130,0.055)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(87,67,130,0.11)] sm:p-7"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-lavender-50 transition-transform duration-500 group-hover:scale-[1.6]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-4xl font-semibold text-lavender-300 transition-colors duration-300 group-hover:text-lavender-500">
                        {item.number}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-50 text-lavender-700 transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
                        <Icon size={16} />
                      </span>
                    </div>

                    <h3 className="mt-8 font-serif text-2xl font-semibold text-ink-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-ink-600">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          NEPAL / NLCITS CONNECTION
      ========================================================== */}

      <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
        <div className="container-page">

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            {/* LEFT */}
            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <div className="relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-lavender-200 shadow-[0_20px_55px_rgba(87,67,130,0.09)] sm:min-h-[480px]">

                <motion.img
                  src="/images/os-group-global.jpg"
                  alt="OS Group global network"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={
                    reducedMotion
                      ? false
                      : {
                          scale: 1.07,
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          scale: 1,
                        }
                  }
                  viewport={{
                    once: true,
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          scale: 1.035,
                        }
                  }
                  transition={{
                    duration: 1.1,
                    ease,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/80 via-[#6f52ad]/10 to-transparent" />

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
                    Nepal connection
                  </p>

                  <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                    Connected from Nepal.
                  </p>
                </motion.div>

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7">
                  <div className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-600 text-white">
                        <MapPin size={17} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">
                          Location
                        </p>

                        <p className="mt-1 font-serif text-xl font-semibold text-ink-900">
                          Nepal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={reducedMotion ? undefined : revealRight}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="lg:pl-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                Our Nepal connection
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Connected from
                <br />
                <span className="text-lavender-600">
                  Nepal.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                OS Group's network connects specialist companies across
                markets. In Nepal, that connection is represented by NLCITS.
              </p>

              {/* CONNECTION CARD */}
              <div className="mt-8 rounded-[1.35rem] border border-lavender-200 bg-white p-5 shadow-[0_12px_40px_rgba(87,67,130,0.07)] sm:p-6">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                  {/* OS GROUP */}
                  <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-600">
                      Group network
                    </span>

                    <div className="mt-4 flex h-20 w-40 items-center justify-center rounded-xl border border-lavender-100 bg-[#FCFBFF] p-4">
                      <img
                        src="/images/os-group-logo.png"
                        alt="OS Group logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <p className="mt-3 font-serif text-xl font-semibold text-ink-900">
                      OS Group
                    </p>
                  </div>

                  {/* CONNECTION */}
                  <div className="flex flex-col items-center justify-center">

                    <div className="hidden h-px w-14 bg-lavender-200 sm:block" />

                    <motion.div
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              scale: [1, 1.08, 1],
                            }
                      }
                      transition={
                        reducedMotion
                          ? undefined
                          : {
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-50 text-lavender-600 ring-1 ring-lavender-200"
                    >
                      <ArrowRight
                        size={18}
                        className="hidden sm:block"
                      />

                      <MapPin
                        size={18}
                        className="sm:hidden"
                      />
                    </motion.div>

                    <div className="h-8 w-px bg-lavender-200 sm:hidden" />
                  </div>

                  {/* NLCITS */}
                  <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-600">
                      <MapPin size={12} />
                      Nepal
                    </div>

                    <div className="mt-4 flex h-20 w-40 items-center justify-center rounded-xl border border-lavender-100 bg-white p-4">
                      <img
                        src="/images/nlcits-logo.png"
                        alt="NLCITS logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <p className="mt-3 font-serif text-xl font-semibold text-ink-900">
                      NLCITS
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-lavender-100 pt-5">
                  <p className="text-center text-sm leading-6 text-ink-600">
                    Local expertise,
                    <span className="font-semibold text-lavender-700">
                      {' '}
                      connected to a wider network.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {[
                  'Nepal',
                  'Technology',
                  'Specialist expertise',
                  'Global connection',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-lavender-200 bg-lavender-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lavender-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPANY DIRECTORY
      ========================================================== */}

      <section
        id="companies"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">

          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid gap-8 border-b border-lavender-200 pb-8 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                Our companies
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Meet the
                <br />
                <span className="text-lavender-600">
                  network.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-ink-600">
                Explore the companies that bring specialist knowledge,
                experience and capability to the wider OS Group.
              </p>
            </div>

            {!loading && companies.length > 0 && (
              <div className="flex items-center gap-3 lg:pb-1">
                <span className="font-serif text-5xl font-semibold text-lavender-300">
                  {companies.length}
                </span>

                <span className="max-w-[100px] text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-ink-500">
                  Group companies
                </span>
              </div>
            )}
          </motion.div>

          {/* LOADING */}
          {loading && (
            <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: [0.45, 0.8, 0.45],
                        }
                  }
                  transition={
                    reducedMotion
                      ? undefined
                      : {
                          duration: 1.5,
                          repeat: Infinity,
                          delay: item * 0.15,
                        }
                  }
                  className="overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white"
                >
                  <div className="aspect-[16/9] bg-lavender-50" />

                  <div className="space-y-4 p-7">
                    <div className="h-3 w-28 rounded-full bg-lavender-100" />
                    <div className="h-8 w-3/4 rounded-lg bg-lavender-100" />
                    <div className="h-4 w-full rounded-full bg-lavender-50" />
                    <div className="h-4 w-5/6 rounded-full bg-lavender-50" />
                    <div className="mt-5 h-px w-full bg-lavender-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && companies.length === 0 && (
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
              viewport={{
                once: true,
              }}
              className="flex min-h-[350px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lavender-200 bg-lavender-50 text-lavender-600">
                <Building2 size={28} />
              </div>

              <h3 className="mt-6 font-serif text-3xl font-semibold text-ink-900">
                Companies coming soon
              </h3>

              <p className="mt-3 max-w-md text-sm leading-7 text-ink-600">
                Our network is growing. Company profiles will appear here as
                they are published.
              </p>
            </motion.div>
          )}

          {/* COMPANIES */}
          {!loading && companies.length > 0 && (
            <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company, index) => (
                <CompanyCard
                  key={
                    company._id ||
                    company.slug ||
                    index
                  }
                  company={company}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          NETWORK STATEMENT
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
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
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
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 45,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
          className="pointer-events-none absolute -left-48 bottom-[-240px] h-[600px] w-[600px] rounded-full border border-lavender-300/10"
        />

        <div className="container-page relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-300">
                One network
              </p>

              <div className="mt-6 h-px w-16 bg-lavender-400" />

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                Different expertise gives the group breadth. Shared standards
                create the consistency that connects every company.
              </p>
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
              <p className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Built from
                <span className="text-lavender-300">
                  {' '}
                  specialists.
                </span>
                <br />
                Connected by
                <span className="text-lavender-300">
                  {' '}
                  purpose.
                </span>
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
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
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="rounded-[1.75rem] border border-lavender-200 bg-white px-6 py-10 shadow-[0_18px_55px_rgba(87,67,130,0.08)] sm:px-10 sm:py-12 lg:px-14"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">
                  Explore OS Group
                </p>

                <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-5xl">
                  Discover the companies
                  <br />
                  <span className="text-lavender-600">
                    behind the group.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-ink-600 sm:text-base">
                  Explore each company to understand its expertise, services
                  and role within the wider OS Group network.
                </p>
              </div>

              <Link
                to="/companies"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-lavender-600 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,173,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                View all companies

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
            Our Network
          </span>

          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
            <span>OS Group</span>

            <span className="text-lavender-500">
              •
            </span>

            <span>
              Companies · Expertise · Growth
            </span>
          </div>

        </div>
      </section>
    </main>
  );
}