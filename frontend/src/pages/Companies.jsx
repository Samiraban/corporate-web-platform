import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  MapPin,
  MoveUpRight,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';

const ease = [0.16, 1, 0.3, 1];

const revealUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
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
  hidden: {
    opacity: 0,
    x: -40,
  },
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
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

/* =========================================================
   IMAGE HELPERS
========================================================= */

function mediaUrl(value) {
  if (!value) return '';

  if (
    /^https?:\/\//i.test(value) ||
    value.startsWith('/') ||
    value.startsWith('data:')
  ) {
    return value;
  }

  return `/api/${value.replace(/^\/+/, '')}`;
}

function getCompanyImage(company) {
  if (company?.coverImage) {
    return mediaUrl(company.coverImage);
  }

  if (
    Array.isArray(company?.gallery) &&
    company.gallery.length > 0
  ) {
    const firstGalleryImage = company.gallery[0];

    if (typeof firstGalleryImage === 'string') {
      return mediaUrl(firstGalleryImage);
    }

    if (firstGalleryImage?.url) {
      return mediaUrl(firstGalleryImage.url);
    }
  }

  if (company?.image) {
    return mediaUrl(company.image);
  }

  return '';
}

/* =========================================================
   COMPANY NORMALIZATION
========================================================= */

function normalizeCompanies(data) {
  const nlcitsPattern =
    /nepal\s+living.*connecting.*it\s+solution/i;

  let nlcitsSeen = false;

  return data
    .filter((company) => {
      const isNlcits = nlcitsPattern.test(
        company?.name || ''
      );

      if (!isNlcits) {
        return true;
      }

      if (nlcitsSeen) {
        return false;
      }

      nlcitsSeen = true;

      return true;
    })
    .map((company) => {
      const isNlcits = nlcitsPattern.test(
        company?.name || ''
      );

      if (!isNlcits) {
        return company;
      }

      return {
        ...company,
        logo:
          company.logo ||
          '/images/nlcits-logo.png',
        name:
          'Nepal Living and Connecting IT Solutions',
      };
    });
}

/* =========================================================
   COMPANY CARD
========================================================= */

function CompanyCard({
  company,
  index,
  reducedMotion,
}) {
  const image = getCompanyImage(company);

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={
        reducedMotion
          ? undefined
          : index % 2 === 0
            ? revealLeft
            : revealRight
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
        amount: 0.12,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -8,
            }
      }
      className="
        group
        overflow-hidden
        rounded-[1.5rem]
        border
        border-lavender-200
        bg-white
        shadow-[0_12px_40px_rgba(87,67,130,0.07)]
        transition-shadow
        duration-300
        hover:shadow-[0_22px_55px_rgba(87,67,130,0.13)]
      "
    >
      <Link
        to={`/companies/${company.slug}`}
        className="
          block
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-lavender-500
          focus-visible:ring-offset-4
        "
      >
        {/* =================================================
            COMPANY IMAGE
        ================================================= */}

        <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F0FA]">

          {image ? (
            <motion.img
              src={image}
              alt={`${company.name} cover`}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
              "
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
                      scale: 1.07,
                    }
              }
              transition={{
                duration: 0.75,
                ease,
              }}
              onError={(event) => {
                event.currentTarget.style.display =
                  'none';
              }}
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-gradient-to-br
                from-[#F7F4FC]
                to-[#ECE5F8]
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-lavender-200
                  bg-white
                  text-lavender-600
                  shadow-sm
                "
              >
                <Building2 size={30} />
              </div>
            </div>
          )}

          {/* IMAGE OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#241C35]/85
              via-[#30254A]/15
              to-transparent
            "
          />

          {/* NUMBER */}

          <div
            className="
              absolute
              left-5
              top-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-white/95
              text-xs
              font-bold
              text-lavender-700
              shadow-sm
              backdrop-blur-sm
            "
          >
            {number}
          </div>

          {/* IMAGE BOTTOM INFORMATION */}

          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-lavender-200
                "
              >
                OS Group company
              </p>

              {company.industryType && (
                <p
                  className="
                    mt-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-white/90
                  "
                >
                  {company.industryType}
                </p>
              )}
            </div>

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-lavender-700
                shadow-lg
                transition-all
                duration-300
                group-hover:bg-lavender-600
                group-hover:text-white
              "
            >
              <MoveUpRight size={17} />
            </div>
          </div>
        </div>

        {/* =================================================
            COMPANY CONTENT
        ================================================= */}

        <div className="p-6 sm:p-7">

          {/* LOGO */}

          <div className="mb-5 flex h-10 items-center">

            {company.logo ? (
              <img
                src={mediaUrl(company.logo)}
                alt={`${company.name} logo`}
                loading="lazy"
                className="
                  max-h-10
                  max-w-[190px]
                  object-contain
                  object-left
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-lavender-50
                  text-lavender-700
                "
              >
                <Building2 size={17} />
              </div>
            )}

          </div>

          {/* TITLE */}

          <h3
            className="
              font-serif
              text-[1.65rem]
              font-semibold
              leading-[1.05]
              tracking-[-0.025em]
              text-[#111827]
              sm:text-[1.85rem]
            "
          >
            {company.name}
          </h3>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              min-h-[48px]
              text-[15px]
              leading-6
              text-[#514B5E]
            "
          >
            {company.tagline ||
              company.overview ||
              'Specialist company within the OS Group network.'}
          </p>

          {/* LOCATION */}

          {company.headquarters && (
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-xs
                font-medium
                text-[#6F697D]
              "
            >
              <MapPin
                size={14}
                className="text-lavender-600"
              />

              <span>
                {company.headquarters}
              </span>
            </div>
          )}

          {/* CARD FOOTER */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-lavender-100
              pt-5
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-lavender-700
              "
            >
              Explore company
            </span>

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-lavender-50
                text-lavender-700
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-lavender-600
                group-hover:text-white
              "
            >
              <ArrowRight size={16} />
            </span>
          </div>

        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPANIES PAGE
========================================================= */

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useReducedMotion();

  /* =======================================================
     LOAD COMPANIES
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadCompanies = async () => {
      try {
        const response = await api.get(
          '/companies?status=published&limit=100&sort=order'
        );

        if (!mounted) return;

        const data =
          response?.data?.data ||
          response?.data ||
          [];

        setCompanies(
          normalizeCompanies(
            Array.isArray(data)
              ? data
              : []
          )
        );
      } catch (error) {
        console.error(
          'Failed to load companies:',
          error
        );

        if (mounted) {
          setCompanies([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCompanies();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main
      className="
        overflow-hidden
        bg-[#FCFBFF]
        text-[#111827]
      "
    >
      <SEO
        title="Our Companies"
        description="Meet the specialist companies that form the OS Group network."
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-lavender-100
          bg-white
        "
      >
        <div
          className="
            container-page
            relative
            py-16
            sm:py-20
            lg:py-24
          "
        >
          <div
            className="
              grid
              items-center
              gap-10
              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-16
            "
          >

            {/* =================================================
                HERO LEFT
            ================================================= */}

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
            >

              {/* BADGE */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-lavender-200
                  bg-lavender-50
                  px-3.5
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-lavender-700
                "
              >
                <Sparkles size={13} />

                Group companies
              </div>

              {/* TITLE */}

              <h1
                className="
                  mt-6
                  max-w-3xl
                  font-serif
                  text-[clamp(3.2rem,7vw,6.6rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-[#111827]
                "
              >
                Our
                <br />

                <span className="text-lavender-600">
                  companies.
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-7
                  text-[#514B5E]
                  sm:text-lg
                "
              >
                Specialist businesses connected by a shared
                commitment to quality, expertise, responsible
                growth and long-term relationships.
              </p>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  to="#companies"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    gap-2
                    rounded-full
                    bg-lavender-600
                    px-5
                    text-sm
                    font-bold
                    text-black
                    shadow-[0_10px_24px_rgba(111,82,173,0.2)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-lavender-700
                  "
                >
                  Meet the companies

                  <ArrowDown size={16} />
                </Link>

                <Link
                  to="/about/our-network"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-lavender-200
                    bg-white
                    px-5
                    text-sm
                    font-bold
                    text-[#29243A]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-lavender-400
                    hover:bg-lavender-50
                  "
                >
                  Explore our network

                  <ArrowRight size={16} />
                </Link>

              </div>

            </motion.div>

            {/* =================================================
                HERO IMAGE
            ================================================= */}

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
              className="
                relative
                min-h-[350px]
                overflow-hidden
                rounded-[1.75rem]
                border
                border-lavender-200
                bg-[#F5F1FA]
                shadow-[0_20px_55px_rgba(87,67,130,0.1)]
                sm:min-h-[420px]
              "
            >

              {/* YOUR NEW IMAGE */}

              <motion.img
                src="/images/companies-hero.jpg"
                alt="OS Group companies and industries"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
                initial={
                  reducedMotion
                    ? false
                    : {
                        scale: 1.04,
                      }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scale: [1.04, 1.08, 1.04],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
              />

              {/* DARK OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#171226]/80
                  via-[#171226]/20
                  to-transparent
                "
              />

              {/* TOP LABEL */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  rounded-full
                  border
                  border-white/40
                  bg-black/20
                  px-4
                  py-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  backdrop-blur-md
                  sm:left-7
                  sm:top-7
                "
              >
                Across the group
              </div>

              {/* BOTTOM CONTENT */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  sm:bottom-7
                  sm:left-7
                  sm:right-7
                "
              >

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
                  className="
                    max-w-md
                    rounded-2xl
                    border
                    border-white/50
                    bg-white/92
                    p-5
                    shadow-xl
                    backdrop-blur-md
                    sm:p-6
                  "
                >

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-lavender-600
                    "
                  >
                    Our companies
                  </p>

                  <h2
                    className="
                      mt-2
                      font-serif
                      text-2xl
                      font-semibold
                      leading-tight
                      text-[#111827]
                      sm:text-3xl
                    "
                  >
                    Expertise.
                    <br />
                    People.
                    <br />
                    Performance.
                  </h2>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-t
                      border-lavender-100
                      pt-4
                    "
                  >

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#6F697D]
                      "
                    >
                      Specialist companies
                    </span>

                    <Building2
                      size={18}
                      className="text-lavender-600"
                    />

                  </div>

                </motion.div>

              </div>

            </motion.div>

          </div>
        </div>

        {/* BACKGROUND DECORATION */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-lavender-100/70
            blur-3xl
          "
        />

      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section
        className="
          bg-[#FCFBFF]
          py-16
          sm:py-20
          lg:py-24
        "
      >
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
            className="
              grid
              gap-10
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-lavender-600
                "
              >
                Who makes up the group
              </p>

              <h2
                className="
                  mt-4
                  font-serif
                  text-4xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-[#111827]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Different strengths.
                <br />

                <span className="text-lavender-600">
                  Shared direction.
                </span>
              </h2>

            </div>

            <div
              className="
                lg:max-w-2xl
                lg:justify-self-end
              "
            >

              <p
                className="
                  text-base
                  leading-7
                  text-[#514B5E]
                  sm:text-lg
                  sm:leading-8
                "
              >
                Every company within OS Group has its own role,
                expertise and market knowledge. Together, those
                specialist capabilities create a broader network
                for clients, partners and opportunities.
              </p>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-4
                  border-t
                  border-lavender-200
                  pt-5
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-lavender-100
                    text-lavender-700
                  "
                >
                  <Users size={15} />
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#6F697D]
                  "
                >
                  People + expertise + connection
                </span>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          COMPANY DIRECTORY
      ====================================================== */}

      <section
        id="companies"
        className="
          scroll-mt-24
          bg-white
          py-16
          sm:py-20
          lg:py-24
        "
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
              amount: 0.2,
            }}
            className="
              flex
              flex-col
              gap-6
              border-b
              border-lavender-200
              pb-8
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-lavender-600
                "
              >
                Group companies
              </p>

              <h2
                className="
                  mt-4
                  font-serif
                  text-4xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-[#111827]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Meet the
                <br />

                <span className="text-lavender-600">
                  companies.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-[#514B5E]
                "
              >
                Explore the specialist businesses that form
                the OS Group network.
              </p>

            </div>

            {!loading &&
              companies.length > 0 && (
                <div className="flex items-center gap-3">

                  <span
                    className="
                      font-serif
                      text-5xl
                      font-semibold
                      text-lavender-300
                    "
                  >
                    {companies.length}
                  </span>

                  <span
                    className="
                      max-w-[100px]
                      text-[10px]
                      font-bold
                      uppercase
                      leading-5
                      tracking-[0.2em]
                      text-[#6F697D]
                    "
                  >
                    Group companies
                  </span>

                </div>
              )}

          </motion.div>

          {/* =================================================
              LOADING STATE
          ================================================= */}

          {loading && (
            <div
              className="
                grid
                gap-6
                pt-10
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-lavender-200
                    bg-white
                  "
                >

                  <div
                    className="
                      aspect-[16/10]
                      animate-pulse
                      bg-lavender-50
                    "
                  />

                  <div className="space-y-4 p-7">

                    <div
                      className="
                        h-4
                        w-28
                        animate-pulse
                        rounded-full
                        bg-lavender-100
                      "
                    />

                    <div
                      className="
                        h-8
                        w-4/5
                        animate-pulse
                        rounded-lg
                        bg-lavender-100
                      "
                    />

                    <div
                      className="
                        h-4
                        w-full
                        animate-pulse
                        rounded-full
                        bg-lavender-50
                      "
                    />

                    <div
                      className="
                        h-4
                        w-5/6
                        animate-pulse
                        rounded-full
                        bg-lavender-50
                      "
                    />

                    <div
                      className="
                        h-px
                        w-full
                        bg-lavender-100
                      "
                    />

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading &&
            companies.length === 0 && (
              <div
                className="
                  flex
                  min-h-[350px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >

                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-lavender-200
                    bg-lavender-50
                    text-lavender-600
                  "
                >
                  <Building2 size={28} />
                </div>

                <h3
                  className="
                    mt-6
                    font-serif
                    text-3xl
                    font-semibold
                    text-[#111827]
                  "
                >
                  Companies coming soon
                </h3>

                <p
                  className="
                    mt-3
                    max-w-md
                    text-sm
                    leading-7
                    text-[#514B5E]
                  "
                >
                  Our published group companies will appear here.
                </p>

              </div>
            )}

          {/* =================================================
              COMPANY CARDS
          ================================================= */}

          {!loading &&
            companies.length > 0 && (
              <div
                className="
                  grid
                  gap-6
                  pt-10
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {companies.map(
                  (company, index) => (
                    <CompanyCard
                      key={
                        company._id ||
                        company.slug ||
                        index
                      }
                      company={company}
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
          NETWORK CONNECTION SECTION
      ====================================================== */}

      <section
        className="
          bg-[#FCFBFF]
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <div className="container-page">

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1fr_1fr]
              lg:items-center
            "
          >

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

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-lavender-600
                "
              >
                The bigger picture
              </p>

              <h2
                className="
                  mt-4
                  max-w-xl
                  font-serif
                  text-4xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-[#111827]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                A network that
                <br />

                <span className="text-lavender-600">
                  creates possibilities.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  leading-7
                  text-[#514B5E]
                  sm:text-lg
                "
              >
                The strength of OS Group comes from combining
                specialist companies without losing the individual
                expertise that makes each one valuable.
              </p>

              <div
                className="
                  mt-8
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                {[
                  'Specialist expertise',
                  'Shared standards',
                  'Connected markets',
                  'Long-term relationships',
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-lavender-100
                      bg-white
                      px-4
                      py-3
                    "
                  >

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-lavender-50
                        text-lavender-600
                      "
                    >
                      <Check size={14} />
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#29243A]
                      "
                    >
                      {item}
                    </span>

                  </div>
                ))}
              </div>

            </motion.div>

            {/* RIGHT */}

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
              whileInView={
                reducedMotion
                  ? undefined
                  : 'visible'
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                relative
                overflow-hidden
                rounded-[1.75rem]
                border
                border-lavender-200
                bg-[#30254A]
                p-7
                text-white
                shadow-[0_20px_55px_rgba(87,67,130,0.12)]
                sm:p-9
                lg:p-11
              "
            >

              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  border
                  border-lavender-300/10
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-lavender-500
                    text-white
                  "
                >
                  <Globe2 size={20} />
                </div>

                <p
                  className="
                    mt-8
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-lavender-300
                  "
                >
                  OS Group network
                </p>

                <h3
                  className="
                    mt-4
                    font-serif
                    text-3xl
                    font-semibold
                    leading-tight
                    sm:text-4xl
                  "
                >
                  Independent companies.
                  <br />

                  <span className="text-lavender-300">
                    Shared purpose.
                  </span>
                </h3>

                <p
                  className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-7
                    text-white/65
                  "
                >
                  Every company contributes something different
                  to the group. That diversity allows the network
                  to serve a wider range of needs and opportunities.
                </p>

                <Link
                  to="/about/our-network"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-[#30254A]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                  "
                >
                  Explore our network

                  <ArrowRight
                    size={16}
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
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-lavender-50
          py-16
          sm:py-20
          lg:py-24
        "
      >

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-lavender-200/60
            blur-3xl
          "
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
            className="
              rounded-[1.75rem]
              border
              border-lavender-200
              bg-white
              px-6
              py-10
              shadow-[0_18px_55px_rgba(87,67,130,0.08)]
              sm:px-10
              sm:py-12
              lg:px-14
            "
          >

            <div
              className="
                flex
                flex-col
                gap-7
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              <div className="max-w-2xl">

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-lavender-600
                  "
                >
                  Work with OS Group
                </p>

                <h2
                  className="
                    mt-3
                    font-serif
                    text-3xl
                    font-semibold
                    leading-tight
                    tracking-[-0.03em]
                    text-[#111827]
                    sm:text-5xl
                  "
                >
                  Explore the companies
                  <br />

                  <span className="text-lavender-600">
                    behind the group.
                  </span>
                </h2>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-[#514B5E]
                    sm:text-base
                  "
                >
                  Discover the expertise, people and capabilities
                  behind each OS Group company.
                </p>

              </div>

              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  min-h-12
                  shrink-0
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-lavender-600
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_28px_rgba(111,82,173,0.22)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-lavender-700
                "
              >
                Get in touch

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

      {/* =====================================================
          FOOTER STRIP
      ====================================================== */}

      <section
        className="
          border-t
          border-lavender-100
          bg-white
          py-7
        "
      >
        <div
          className="
            container-page
            flex
            flex-col
            justify-between
            gap-4
            sm:flex-row
            sm:items-center
          "
        >

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#6F697D]
            "
          >
            Our Companies
          </span>

          <div
            className="
              flex
              items-center
              gap-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#8A8494]
            "
          >

            <span>
              OS Group
            </span>

            <span className="text-lavender-500">
              •
            </span>

            <span>
              Expertise · People · Performance
            </span>

          </div>

        </div>
      </section>

    </main>
  );
}