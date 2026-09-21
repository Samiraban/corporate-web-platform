import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  MoveUpRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';

const ease = [0.16, 1, 0.3, 1];

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const revealLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const revealRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

/* -------------------------------------------------------
   SERVICE IMAGE HELPER
------------------------------------------------------- */

function getServiceImage(service) {
  return (
    service?.image ||
    service?.coverImage ||
    service?.featuredImage ||
    service?.thumbnail ||
    service?.displayImage ||
    '/images/os-group-global.jpg'
  );
}

/* -------------------------------------------------------
   SERVICE CARD
------------------------------------------------------- */

function ServiceCard({ service, index, reducedMotion }) {
  const number = String(index + 1).padStart(2, '0');

  const image = getServiceImage(service);

  const title =
    service?.title ||
    service?.name ||
    'Specialist Service';

  const description =
    service?.shortDescription ||
    service?.description ||
    'Specialist services delivered through the OS Group network.';

  const slug =
    service?.slug ||
    service?._id ||
    '';

  return (
    <motion.article
      variants={
        reducedMotion
          ? undefined
          : index % 2 === 0
            ? revealLeft
            : revealRight
      }
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
              y: -5,
            }
      }
      transition={{
        duration: 0.25,
        ease,
      }}
      className="group overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.07)]"
    >
      <Link
        to={`/services/${slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-4"
        aria-label={`Explore ${title}`}
      >
        {/* IMAGE */}
        <div className="relative aspect-[16/8.5] overflow-hidden bg-lavender-50">
          <motion.img
            src={image}
            alt={title}
            loading={index < 2 ? 'eager' : 'lazy'}
            onError={(event) => {
              event.currentTarget.src = '/images/os-group-global.jpg';
            }}
            className="h-full w-full object-cover"
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.045,
                  }
            }
            transition={{
              duration: 0.65,
              ease,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/45 to-transparent" />

          {/* NUMBER */}
          <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-sm font-bold text-black shadow-sm sm:left-6 sm:top-6">
            {number}
          </div>

          {/* ARROW */}
          <motion.div
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-black shadow-sm sm:right-6 sm:top-6"
            whileHover={
              reducedMotion
                ? undefined
                : {
                    rotate: 8,
                    scale: 1.06,
                  }
            }
          >
            <MoveUpRight
              size={17}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black">
            <span className="h-px w-7 bg-lavender-300" />
            OS Group capability
          </div>

          <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] text-black sm:text-3xl">
            {title}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black sm:text-[15px]">
            {description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-lavender-100 pt-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-black">
              Explore service
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-50 text-black transition-all duration-300 group-hover:bg-lavender-600 group-hover:text-white">
              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* -------------------------------------------------------
   SERVICES PAGE
------------------------------------------------------- */

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    api
      .get('/services?status=published&limit=100&sort=order')
      .then((response) => {
        if (!mounted) return;

        const data =
          response?.data?.data ||
          response?.data ||
          [];

        const serviceList = Array.isArray(data)
          ? data
          : [];

        setServices(serviceList);
      })
      .catch((error) => {
        console.error(
          'Failed to load services:',
          error
        );

        if (mounted) {
          setServices([]);
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
    <main className="overflow-hidden bg-[#FCFBFF] text-black">
      <SEO
        title="Services"
        description="Explore the specialist services offered across the OS Group of Company portfolio."
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-lavender-100 bg-white">
        <div className="container-page relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

            {/* LEFT */}
            <motion.div
              variants={
                reducedMotion
                  ? undefined
                  : revealLeft
              }
              initial={
                reducedMotion
                  ? false
                  : 'hidden'
              }
              animate={
                reducedMotion
                  ? undefined
                  : 'visible'
              }
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-lavender-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black">
                <Sparkles
                  size={13}
                  aria-hidden="true"
                />
                Our capabilities
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-black">
                Services built
                <br />
                <span className="text-black">
                  around expertise.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-black sm:text-lg">
                Specialist services delivered by
                focused companies across the OS Group
                network, combining expertise, experience
                and shared standards.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">

                {/* EXPLORE */}
                <a
                  href="#services"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Explore services
                  <ArrowDown
                    size={16}
                    aria-hidden="true"
                  />
                </a>

                {/* CONTACT */}
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Discuss a requirement
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              variants={
                reducedMotion
                  ? undefined
                  : revealRight
              }
              initial={
                reducedMotion
                  ? false
                  : 'hidden'
              }
              animate={
                reducedMotion
                  ? undefined
                  : 'visible'
              }
              className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-lavender-50 shadow-[0_20px_55px_rgba(87,67,130,0.1)] sm:min-h-[390px]"
            >
              <motion.img
                src="/images/os-group-global.jpg"
                alt="OS Group network and services"
                onError={(event) => {
                  event.currentTarget.style.display =
                    'none';
                }}
                className="absolute inset-0 h-full w-full object-cover"
                initial={
                  reducedMotion
                    ? false
                    : {
                        scale: 1.05,
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
                  duration: 1.1,
                  ease,
                }}
              />

              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/80 to-transparent" />

              {/* TOP CARD */}
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
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
                className="absolute left-5 top-5 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg sm:left-7 sm:top-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Across the group
                </p>

                <p className="mt-1 font-serif text-lg font-semibold text-black">
                  Expertise. People. Performance.
                </p>
              </motion.div>

              {/* BOTTOM CARD */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-lavender-200 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black">
                  What we do
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="font-serif text-2xl font-semibold leading-tight text-black sm:text-3xl">
                    Specialist solutions for real
                    business needs.
                  </p>

                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lavender-600 text-black sm:flex">
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="container-page">
          <motion.div
            variants={
              reducedMotion
                ? undefined
                : revealUp
            }
            initial={
              reducedMotion
                ? false
                : 'hidden'
            }
            whileInView={
              reducedMotion
                ? undefined
                : 'visible'
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                Our services
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
                What we do.
              </h2>
            </div>

            <div className="lg:max-w-2xl lg:justify-self-end">
              <p className="text-base leading-7 text-black sm:text-lg sm:leading-8">
                Across the OS Group network,
                specialist companies deliver services
                designed around the needs of their
                industries and clients. Each service is
                supported by experienced people and a
                wider group standard.
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-lavender-200 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-black">
                  <Sparkles
                    size={15}
                    aria-hidden="true"
                  />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                  {loading
                    ? 'Loading services'
                    : `${services.length} services across the group`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="scroll-mt-24 bg-lavender-50/55 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">

          {/* SECTION HEADER */}
          <motion.div
            variants={
              reducedMotion
                ? undefined
                : revealUp
            }
            initial={
              reducedMotion
                ? false
                : 'hidden'
            }
            whileInView={
              reducedMotion
                ? undefined
                : 'visible'
            }
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mb-10 flex flex-col gap-5 border-b border-lavender-200 pb-7 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-black">
                Specialist capabilities
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-black sm:text-5xl">
                Our services.
              </h2>
            </div>

            {!loading &&
              services.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl font-semibold text-black">
                    {String(
                      services.length
                    ).padStart(2, '0')}
                  </span>

                  <span className="text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-black">
                    Services across the group
                  </span>
                </div>
              )}
          </motion.div>

          {/* LOADING */}
          {loading && (
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white"
                  >
                    <motion.div
                      animate={{
                        opacity: [
                          0.45,
                          0.85,
                          0.45,
                        ],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay:
                          item * 0.12,
                      }}
                      className="aspect-[16/8.5] bg-lavender-100"
                    />

                    <div className="space-y-3 p-7">
                      <div className="h-3 w-28 rounded bg-lavender-100" />

                      <div className="h-8 w-2/3 rounded bg-lavender-100" />

                      <div className="h-12 w-full rounded bg-lavender-50" />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            services.length === 0 && (
              <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-lavender-200 bg-white px-6 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender-50 text-black">
                    <Sparkles
                      size={24}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 font-serif text-3xl font-semibold text-black">
                    Services coming soon
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-black">
                    Our specialist services will
                    appear here once they are
                    published.
                  </p>
                </div>
              </div>
            )}

          {/* SERVICE CARDS */}
          {!loading &&
            services.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-2">
                {services.map(
                  (service, index) => (
                    <ServiceCard
                      key={
                        service?._id ||
                        service?.slug ||
                        index
                      }
                      service={service}
                      index={index}
                      reducedMotion={
                        reducedMotion
                      }
                    />
                  )
                )}
              </div>
            )}
        </div>
      </section>

      {/* =====================================================
          HOW WE WORK
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            {/* LEFT */}
            <motion.div
              variants={
                reducedMotion
                  ? undefined
                  : revealLeft
              }
              initial={
                reducedMotion
                  ? false
                  : 'hidden'
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : 'visible'
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                How we work
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
                Specialist
                <br />
                <span className="text-black">
                  solutions.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-black sm:text-base">
                Focused expertise, clear delivery and
                long-term relationships create services
                that are useful beyond a single
                engagement.
              </p>
            </motion.div>

            {/* RIGHT */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Understand',
                  text: 'We understand the requirements of each client, market and industry.',
                },
                {
                  number: '02',
                  title: 'Deliver',
                  text: 'Specialist teams deliver focused services backed by experience.',
                },
                {
                  number: '03',
                  title: 'Grow',
                  text: 'Long-term relationships create sustainable value and growth.',
                },
              ].map(
                (item, index) => (
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
                      delay:
                        reducedMotion
                          ? 0
                          : index * 0.1,
                      ease,
                    }}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="rounded-2xl border border-lavender-200 bg-[#FCFBFF] p-6 shadow-[0_8px_30px_rgba(87,67,130,0.045)]"
                  >
                    <span className="font-serif text-3xl font-semibold text-black">
                      {item.number}
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-black">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black">
                      {item.text}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black">
                      <Check
                        size={14}
                        aria-hidden="true"
                      />
                      Group standard
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

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
            variants={
              reducedMotion
                ? undefined
                : revealUp
            }
            initial={
              reducedMotion
                ? false
                : 'hidden'
            }
            whileInView={
              reducedMotion
                ? undefined
                : 'visible'
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="rounded-[1.75rem] border border-lavender-200 bg-white px-6 py-10 shadow-[0_18px_55px_rgba(87,67,130,0.08)] sm:px-10 sm:py-12 lg:px-14"
          >
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                  Work with OS Group
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-black sm:text-5xl">
                  Expertise that{' '}
                  <span className="text-black">
                    moves business forward.
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-black sm:text-base">
                  Discover how our companies and
                  specialist services can support your
                  organisation.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-lavender-600 px-6 text-sm font-bold text-black shadow-[0_12px_28px_rgba(111,82,173,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
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
    </main>
  );
}