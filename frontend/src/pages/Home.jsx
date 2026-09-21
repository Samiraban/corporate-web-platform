import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Users,
  Award,
  Briefcase,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import api from '../services/api';
import { Loading } from '../components/UI';

import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from '../components/anim/AnimatedSection';

import AnimatedText from '../components/anim/AnimatedText';
import AnimatedCounter from '../components/anim/AnimatedCounter';
import MagneticButton from '../components/anim/MagneticButton';
import NepalFlag from '../components/anim/NepalFlag';
import GradientMesh from '../components/anim/GradientMesh';
import BusinessShowcase from '../components/BusinessShowcase';
import SEO from '../components/SEO';


/* =========================================================
   STATISTICS
   ========================================================= */

const NLCITS_COMPANY = {
  _id: 'nlcits-featured',
  slug: 'nlcits',
  name: 'Nepal Living and Connecting IT Solutions',
  tagline: 'Technology, connectivity and digital solutions.',
  logo: '/images/nlcits-logo.png',
};

const STAT_CARDS = [
  {
    icon: Building2,
    label: 'Group Companies',
    value: 8,
    suffix: '+',
  },
  {
    icon: Briefcase,
    label: 'Projects Delivered',
    value: 150,
    suffix: '+',
  },
  {
    icon: Users,
    label: 'Team Members',
    value: 500,
    suffix: '+',
  },
  {
    icon: Award,
    label: 'Years Combined',
    value: 20,
    suffix: '+',
  },
];


/* =========================================================
   FALLBACK SERVICE ICONS
   ========================================================= */

const SERVICE_ICONS = [
  Building2,
  Briefcase,
  Users,
  Award,
  Sparkles,
  Building2,
];


/* =========================================================
   GROUP COMPANY SLIDES
   ========================================================= */

const GROUP_SLIDES = [
  {
    image: '/company-slides/project-1.jpg',
    title: 'Building Better Environments',
    subtitle:
      'Creating solutions across industries through quality, expertise and dependable service.',
    label: 'OS Group',
  },
  {
    image: '/company-slides/project-2.jpg',
    title: 'Infrastructure & Projects',
    subtitle:
      'Supporting major projects with professional services and technology-driven solutions.',
    label: 'OS Group',
  },
  {
    image: '/company-slides/project-3.jpg',
    title: 'Professional Solutions',
    subtitle:
      'Combining people, expertise and operational excellence to deliver meaningful results.',
    label: 'OS Group',
  },
  {
    image: '/company-slides/project-4.jpg',
    title: 'Designed For Progress',
    subtitle:
      'A group of companies working across different sectors with one shared commitment to quality.',
    label: 'OS Group',
  },
];


/* =========================================================
   HOME PAGE
   ========================================================= */

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [heroVideo, setHeroVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(0);
  const [activeGroupSlide, setActiveGroupSlide] = useState(0);
  const [isGroupSlidePaused, setIsGroupSlidePaused] = useState(false);


  /* =======================================================
     LOAD LANDING PAGE DATA
     ======================================================= */

  useEffect(() => {
    Promise.all([
      api.get('/companies?limit=6&status=published'),

      api.get(
        '/industries?limit=6&status=published&sort=order'
      ),

      api.get(
        '/services?limit=6&status=published&sort=order'
      ),

      api.get(
        '/projects?limit=3&publishStatus=published&isFeatured=true'
      ),

      api.get('/testimonials?limit=3'),

      api.get(
        '/news?limit=3&status=published&sort=-publishedAt'
      ),

      api.get('/settings/general'),
    ])
      .then(
        ([
          companiesResponse,
          industriesResponse,
          servicesResponse,
          projectsResponse,
          testimonialsResponse,
          newsResponse,
          settingsResponse,
        ]) => {
          setCompanies(
            companiesResponse.data?.data || []
          );

          setIndustries(
            industriesResponse.data?.data || []
          );

          const nextServices = servicesResponse.data?.data || [];

          setServices(nextServices);
          setActiveService((current) => Math.min(current, Math.max(nextServices.length - 1, 0)));

          setProjects(
            projectsResponse.data?.data || []
          );

          setTestimonials(
            testimonialsResponse.data?.data || []
          );

          setNews(
            newsResponse.data?.data || []
          );

          setHeroVideo(
            settingsResponse.data?.data?.heroVideoUrl || null
          );
        }
      )
      .catch((error) => {
        console.error(
          'Failed to load homepage content:',
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  /* =======================================================
     GROUP COMPANY SLIDESHOW
     ======================================================= */

  useEffect(() => {
    if (isGroupSlidePaused) return undefined;

    const timer = setInterval(() => {
      setActiveGroupSlide((current) =>
        current === GROUP_SLIDES.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [isGroupSlidePaused]);

  const previousGroupSlide = () => {
    setActiveGroupSlide((current) =>
      current === 0 ? GROUP_SLIDES.length - 1 : current - 1
    );
  };

  const nextGroupSlide = () => {
    setActiveGroupSlide((current) =>
      current === GROUP_SLIDES.length - 1 ? 0 : current + 1
    );
  };


  /* =======================================================
     INDUSTRY SHOWCASE DATA
     ======================================================= */

  const showcaseItems = industries
    .slice(0, 5)
    .map((industry, index) => ({
      number: String(index + 1).padStart(2, '0'),

      title: industry.name,

      description:
        industry.description ||
        'Learn more about how OS Group operates in this sector.',

      image:
        industry.image ||
        industry.icon,

      to: '/industries',
    }));


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="bg-white overflow-hidden">

      <SEO
        title={undefined}
        description="OS Group of Company is a diversified group of companies delivering projects and services across multiple industries."
      />


      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative min-h-[760px] lg:min-h-[850px] bg-white text-ink-900 overflow-hidden">

        {/* Background video */}
        {heroVideo ? (
          <>
            <motion.video
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              initial={{
                scale: 1.08,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            <div className="absolute inset-0 bg-white/75" />

            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-white
                via-white/80
                to-lavender-50/30
              "
            />
          </>
        ) : (
          <>
            <GradientMesh />

            <div className="absolute inset-0 os-grid opacity-20" />
          </>
        )}


        {/* Decorative floating orb */}
        <motion.div
          className="
            absolute
            w-56
            h-56
            lg:w-80
            lg:h-80
            rounded-full
            bg-brass-500/20
            blur-3xl
            -top-20
            -right-20
          "
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="
            absolute
            w-32
            h-32
            rounded-full
            bg-os-cyan-500/20
            blur-2xl
            bottom-24
            left-[8%]
          "
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* Hero content */}
        <div
          className="
            container-page
            relative
            z-10
            min-h-[760px]
            lg:min-h-[850px]
            flex
            items-center
            pt-28
            pb-24
          "
        >

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">


            {/* =================================================
                HERO TEXT
                ================================================= */}

            <div className="lg:col-span-7">

              <motion.div
                className="flex items-center gap-3 mb-7"
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
                  delay: 0.15,
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    bg-ink-900/5
                    border
                    border-ink-900/10
                    backdrop-blur-md
                  "
                >
                  <NepalFlag size={22} />
                </div>

                <p className="text-sm font-medium text-ink-900">
                  A group of companies, one standard of trust
                </p>
              </motion.div>


              {/* Main heading */}

              <h1
                className="
                  font-sans
                  text-[clamp(3rem,7vw,6.5rem)]
                  font-extrabold
                  leading-[0.96]
                  tracking-[-0.055em]
                  max-w-5xl
                "
              >
                <AnimatedText
                  as="span"
                  text="Building across industries."
                  split="word"
                  delay={0.25}
                  staggerDelay={0.055}
                  className="block"
                />

                <AnimatedText
                  as="span"
                  text="Delivering on every commitment."
                  split="word"
                  delay={0.8}
                  staggerDelay={0.055}
                  className="block text-ink-900"
                />
              </h1>


              {/* Description */}

              <motion.p
                className="
                  mt-8
                  text-base
                  md:text-lg
                  text-ink-900/80
                  leading-relaxed
                  max-w-2xl
                "
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.15,
                }}
              >
                OS Group brings together diverse companies,
                services and capabilities under one trusted
                identity — creating meaningful impact across
                industries and communities.
              </motion.p>


              {/* Buttons */}

              <motion.div
                className="
                  mt-9
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                "
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.35,
                }}
              >

                <MagneticButton
                  as={Link}
                  to="/companies"
                  className="
                    os-button
                    !bg-white
                    !text-ink-900
                    hover:!bg-blue-50
                  "
                >
                  Explore Our Companies
                  <ArrowRight
                    size={17}
                    className="os-arrow"
                  />
                </MagneticButton>


                <MagneticButton
                  as={Link}
                  to="/contact"
                  className="
                    os-button-outline
                    !bg-ink-900/5
                    !border-ink-900/20
                    !text-ink-900
                    hover:!bg-ink-900/5
                    hover:!border-ink-900/30
                  "
                >
                  Talk to Us
                  <ArrowRight
                    size={17}
                    className="os-arrow"
                  />
                </MagneticButton>

              </motion.div>

            </div>


            {/* =================================================
                HERO VISUAL / STATISTICS
                ================================================= */}

            <motion.div
              className="lg:col-span-5 relative"
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Decorative circle */}

              <motion.div
                className="
                  absolute
                  -top-10
                  -right-5
                  w-24
                  h-24
                  rounded-full
                  border
                  border-ink-900/15
                  backdrop-blur-sm
                "
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />


              {/* Statistics card */}

              <div
                className="
                  relative
                  p-5
                  md:p-6
                  rounded-[30px]
                  bg-white/[0.08]
                  border
                  border-ink-900/10
                  backdrop-blur-xl
                  shadow-2xl
                "
              >

                <div className="grid grid-cols-2 gap-3 md:gap-4">

                  {STAT_CARDS.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                      <motion.div
                        key={stat.label}
                        className="
                          relative
                          min-h-[150px]
                          md:min-h-[170px]
                          p-5
                          rounded-2xl
                          bg-white/[0.07]
                          border
                          border-ink-900/10
                          overflow-hidden
                        "
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.95 + index * 0.12,
                        }}
                        whileHover={{
                          y: -7,
                          backgroundColor:
                            'rgba(255,255,255,0.12)',
                          borderColor:
                            'rgba(69,208,255,0.45)',
                        }}
                      >

                        <div
                          className="
                            absolute
                            -right-8
                            -top-8
                            w-24
                            h-24
                            rounded-full
                            bg-brass-500/15
                            blur-xl
                          "
                        />

                        <Icon
                          size={21}
                          className="text-os-cyan-300 mb-7"
                        />

                        <div
                          className="
                            text-3xl
                            md:text-4xl
                            font-extrabold
                            tracking-tight
                          "
                        >
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                            duration={1.8}
                          />
                        </div>

                        <div
                          className="
                            mt-2
                            text-xs
                            md:text-sm
                            text-ink-900/65
                          "
                        >
                          {stat.label}
                        </div>

                      </motion.div>
                    );
                  })}

                </div>


                {/* Small visual label */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    px-2
                    text-xs
                    text-ink-900/55
                  "
                >
                  <span>OS GROUP</span>

                  <span className="flex items-center gap-2">
                    <span className="os-dot" />
                    Growing together
                  </span>
                </div>

              </div>

            </motion.div>

          </div>
        </div>


        {/* Scroll indicator */}

        <motion.div
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            z-20
            flex
            flex-col
            items-center
            gap-2
            text-ink-900/50
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.8,
          }}
        >

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
            "
          >
            Scroll
          </span>

          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown size={16} />
          </motion.div>

        </motion.div>

      </section>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      {loading ? (
        <Loading />
      ) : (
        <>

          {/* =================================================
              INTRO / OUR STORY
              ================================================= */}

          <section
            className="
              relative
              py-24
              lg:py-36
              bg-white
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                bg-blue-100/50
                blur-3xl
                -right-64
                top-10
              "
            />

            <div
              className="
                absolute
                w-[280px]
                h-[280px]
                rounded-full
                bg-cyan-100/40
                blur-3xl
                -left-40
                bottom-10
              "
            />

            <div
              className="
                container-page
                relative
                grid
                lg:grid-cols-12
                gap-12
                items-center
              "
            >

              {/* Text */}

              <AnimatedSection
                direction="left"
                className="lg:col-span-6"
              >

                <p className="os-eyebrow mb-5">
                  Our Story
                </p>

                <h2
                  className="
                    text-4xl
                    md:text-5xl
                    lg:text-6xl
                    font-extrabold
                    tracking-[-0.04em]
                    leading-[1]
                    text-ink-900
                    max-w-2xl
                  "
                >
                  One group.
                  <span className="block text-ink-900">
                    Multiple possibilities.
                  </span>
                </h2>

                <p
                  className="
                    mt-7
                    text-base
                    md:text-lg
                    text-ash
                    leading-relaxed
                    max-w-xl
                  "
                >
                  OS Group of Company began as a single
                  venture built on a simple idea: do the work
                  properly, and the rest follows.
                </p>

                <p
                  className="
                    mt-4
                    text-base
                    md:text-lg
                    text-ash
                    leading-relaxed
                    max-w-xl
                  "
                >
                  Today, our companies operate across
                  multiple sectors while sharing one standard
                  of integrity, quality and commitment.
                </p>

                <Link
                  to="/about"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-brass-500
                    group
                  "
                >
                  Read our full story

                  <ArrowRight
                    size={16}
                    className="
                      os-arrow
                      group-hover:translate-x-1
                    "
                  />
                </Link>

              </AnimatedSection>


              {/* Visual */}

              <AnimatedSection
                direction="right"
                className="lg:col-span-6"
              >

                <div
                  className="
                    relative
                    min-h-[420px]
                    rounded-[36px]
                    bg-gradient-to-br
                    from-blue-50
                    via-white
                    to-cyan-50
                    border
                    border-blue-100
                    overflow-hidden
                    shadow-os-soft
                  "
                >

                  {/* Grid */}

                  <div
                    className="
                      absolute
                      inset-0
                      os-grid-soft
                      opacity-70
                    "
                  />


                  {/* Main orb */}

                  <motion.div
                    className="
                      absolute
                      w-[320px]
                      h-[320px]
                      rounded-full
                      bg-gradient-to-br
                      from-brass-400/20
                      via-blue-400/15
                      to-cyan-300/20
                      blur-2xl
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                    "
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />


                  {/* Rings */}

                  {[0, 1, 2].map((ring) => (
                    <motion.div
                      key={ring}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border
                        border-blue-200/70
                      "
                      style={{
                        width: `${210 + ring * 75}px`,
                        height: `${210 + ring * 75}px`,
                      }}
                      animate={{
                        rotate:
                          ring % 2 === 0
                            ? [0, 360]
                            : [360, 0],
                      }}
                      transition={{
                        duration:
                          20 + ring * 7,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ))}


                  {/* Floating points */}

                  <motion.div
                    className="
                      absolute
                      top-16
                      right-20
                      w-4
                      h-4
                      rounded-full
                      bg-brass-500
                      shadow-os-blue
                    "
                    animate={{
                      y: [0, -18, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  <motion.div
                    className="
                      absolute
                      bottom-24
                      left-20
                      w-3
                      h-3
                      rounded-full
                      bg-os-cyan-500
                    "
                    animate={{
                      y: [0, 15, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                  />


                  {/* Center content */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <div
                      className="
                        w-32
                        h-32
                        md:w-40
                        md:h-40
                        rounded-full
                        bg-white
                        border
                        border-blue-100
                        shadow-os-card
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                      "
                    >

                      <span
                        className="
                          text-3xl
                          md:text-4xl
                          font-extrabold
                          text-ink-900
                        "
                      >
                        OS
                      </span>

                      <span
                        className="
                          mt-1
                          text-[10px]
                          font-bold
                          tracking-[0.25em]
                          text-ink-500
                        "
                      >
                        GROUP
                      </span>

                    </div>

                  </div>


                  {/* Floating info card */}

                  <motion.div
                    className="
                      absolute
                      bottom-7
                      right-7
                      bg-white/90
                      backdrop-blur-xl
                      border
                      border-blue-100
                      rounded-2xl
                      px-5
                      py-4
                      shadow-os-card
                    "
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >

                    <div className="text-2xl font-extrabold text-ink-900">
                      01
                    </div>

                    <div className="text-xs text-ash mt-1">
                      Shared standard
                    </div>

                  </motion.div>

                </div>

              </AnimatedSection>

            </div>

          </section>


          {/* =================================================
              SERVICES
              ================================================= */}

          {services.length > 0 && (
            <section
              className="
                relative
                py-24
                lg:py-32
                bg-[#f7faff]
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  os-grid-soft
                  opacity-40
                "
              />

              <div
                className="
                  container-page
                  relative
                "
              >

                <AnimatedSection
                  direction="up"
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    justify-between
                    gap-6
                    mb-14
                  "
                >

                  <div className="max-w-2xl">

                    <p className="os-eyebrow mb-5">
                      Our Services
                    </p>

                    <h2
                      className="
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-extrabold
                        tracking-[-0.04em]
                        leading-[1]
                        text-ink-900
                      "
                    >
                      What we
                      <span className="text-ink-900">
                        {' '}do
                      </span>
                    </h2>

                    <p
                      className="
                        mt-5
                        text-ash
                        leading-relaxed
                        max-w-xl
                      "
                    >
                      Explore the services and capabilities
                      that help our companies create value
                      across industries.
                    </p>

                  </div>


                  <Link
                    to="/services"
                    className="
                      shrink-0
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-brass-500
                      group
                    "
                  >
                    View all services

                    <ArrowRight
                      size={16}
                      className="os-arrow"
                    />
                  </Link>

                </AnimatedSection>


                <StaggerContainer
                  className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-5
                  "
                >

                  {services.slice(0, 6).map((service, index) => {
                    const Icon =
                      SERVICE_ICONS[
                        index % SERVICE_ICONS.length
                      ];

                    return (
                      <StaggerItem
                        key={service._id}
                      >

                        <Link
                          to={`/services/${service.slug}`}
                          className="
                            group
                            block
                            h-full
                          "
                        >

                          <motion.article
                            className="
                              relative
                              h-full
                              min-h-[390px]
                              bg-white
                              rounded-[28px]
                              border
                              border-blue-100
                              overflow-hidden
                              shadow-os-soft
                            "
                            whileHover={{
                              y: -10,
                            }}
                            transition={{
                              duration: 0.35,
                            }}
                          >

                            {/* Image */}

                            <div
                              className="
                                relative
                                h-52
                                overflow-hidden
                                bg-blue-50
                              "
                            >

                              {service.image ? (
                                <motion.img
                                  src={service.image}
                                  alt={service.title}
                                  className="
                                    w-full
                                    h-full
                                    object-cover
                                  "
                                  whileHover={{
                                    scale: 1.08,
                                  }}
                                  transition={{
                                    duration: 0.7,
                                  }}
                                />
                              ) : (
                                <div
                                  className="
                                    w-full
                                    h-full
                                    bg-gradient-to-br
                                    from-blue-100
                                    via-blue-50
                                    to-cyan-50
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >
                                  <Icon
                                    size={48}
                                    className="
                                      text-brass-500
                                    "
                                  />
                                </div>
                              )}

                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-white/50
                                  via-transparent
                                  to-transparent
                                "
                              />


                              {/* Number */}

                              <div
                                className="
                                  absolute
                                  top-5
                                  left-5
                                  w-10
                                  h-10
                                  rounded-full
                                  bg-white/90
                                  backdrop-blur
                                  flex
                                  items-center
                                  justify-center
                                  text-xs
                                  font-extrabold
                                  text-ink-900
                                "
                              >
                                {String(index + 1).padStart(2, '0')}
                              </div>

                            </div>


                            {/* Content */}

                            <div className="p-6">

                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-4
                                "
                              >

                                <h3
                                  className="
                                    text-xl
                                    font-extrabold
                                    text-ink-900
                                    tracking-tight
                                    group-hover:text-brass-500
                                    transition-colors
                                  "
                                >
                                  {service.title}
                                </h3>

                                <span
                                  className="
                                    shrink-0
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                    text-brass-500
                                    group-hover:bg-brass-500
                                    group-hover:text-ink-900
                                    transition-all
                                  "
                                >
                                  <ArrowRight
                                    size={16}
                                    className="os-arrow"
                                  />
                                </span>

                              </div>

                              <p
                                className="
                                  mt-3
                                  text-sm
                                  text-ash
                                  leading-relaxed
                                  line-clamp-3
                                "
                              >
                                {service.shortDescription ||
                                  'Discover our services and capabilities.'}
                              </p>

                            </div>

                          </motion.article>

                        </Link>

                      </StaggerItem>
                    );
                  })}

                </StaggerContainer>

              </div>

            </section>
          )}


          {/* =================================================
              INDUSTRIES
              ================================================= */}

          {showcaseItems.length > 0 && (
            <section className="relative overflow-hidden bg-[#fffdf9] py-24 lg:py-36">
              <motion.div
                animate={{ x: [0, 25, -10, 0], y: [0, -15, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-[#f1e3c9]/65 blur-3xl"
              />

              <motion.div
                animate={{ x: [0, -18, 10, 0], y: [0, 16, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-[#f7ecdb] blur-3xl"
              />

              <div className="container-page relative z-10">
                <AnimatedSection
                  direction="up"
                  className="mb-14 max-w-3xl"
                >
                  <p className="os-eyebrow mb-5 text-[#a17a38]">
                    Our Industries
                  </p>

                  <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.04em] text-[#6e675e] md:text-5xl lg:text-6xl">
                    Sectors we
                    <span className="text-[#b1843c]"> operate across</span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 max-w-2xl text-base leading-7 text-[#81796e]"
                  >
                    Explore the industries where OS Group companies bring specialist expertise, people and practical solutions together.
                  </motion.p>
                </AnimatedSection>

                <AnimatedSection direction="scale" delay={0.1}>
                  <BusinessShowcase items={showcaseItems} />
                </AnimatedSection>


                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 overflow-hidden rounded-[22px] border border-[#e5ddf5] bg-[#faf8ff]"
                >
                  <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-6 lg:p-7">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#e8e1f5] bg-white p-4">
                      <img
                        src="/images/nlcits-logo.png"
                        alt="Nepal Living and Connecting IT Solutions (NLCITS)"
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#725ca8]">
                        Technology &amp; IT Solutions
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink-900">
                        Nepal Living and Connecting IT Solutions
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-ash">
                        Connecting digital capability, IT services and technology solutions across the OS Group network.
                      </p>
                    </div>

                    <Link
                      to="/companies/nlcits"
                      className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#cfc3e8] bg-white px-5 text-sm font-bold text-[#5b4b8a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f3effd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b72b6] focus-visible:ring-offset-2"
                    >
                      Explore NLCITS
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-9"
                >
                  <Link
                    to="/industries"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-[#a17a38]"
                  >
                    See all industries
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </section>
          )}


          {/* =================================================
              GROUP COMPANIES
              ================================================= */}

          {companies.length > 0 && (
            <section
              className="
                relative
                py-24
                lg:py-36
                bg-[#f7faff]
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  os-grid-soft
                  opacity-40
                "
              />

              <motion.div
                className="
                  absolute
                  w-[400px]
                  h-[400px]
                  rounded-full
                  bg-blue-200/30
                  blur-3xl
                  -right-40
                  top-20
                "
                animate={{
                  y: [0, 25, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />


              <div className="container-page relative">

                <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

                  <AnimatedSection
                    direction="up"
                    className="max-w-2xl"
                  >

                    <p className="os-eyebrow mb-5">
                      Our Group
                    </p>

                    <h2
                      className="
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-extrabold
                        tracking-[-0.04em]
                        leading-[1]
                        text-ink-900
                      "
                    >
                      Companies under the
                      <span className="block text-ink-900">
                        OS Group umbrella
                      </span>
                    </h2>

                    <p
                      className="
                        mt-5
                        text-base
                        md:text-lg
                        text-ash
                        leading-relaxed
                        max-w-xl
                      "
                    >
                      Each subsidiary operates independently
                      in its field while sharing the group's
                      values of integrity, quality and
                      commitment.
                    </p>

                    <Link
                      to="/companies"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brass-500 group"
                    >
                      Explore all companies
                      <ArrowRight size={16} className="os-arrow" />
                    </Link>

                  </AnimatedSection>

                  {/* GROUP IMAGE SLIDESHOW */}
                  <AnimatedSection
                    direction="scale"
                    className="relative"
                  >
                    <div
                      className="relative aspect-[16/11] min-h-[360px] overflow-hidden rounded-[28px] bg-ink-900 shadow-os-soft sm:min-h-[430px] lg:min-h-[500px]"
                      onMouseEnter={() => setIsGroupSlidePaused(true)}
                      onMouseLeave={() => setIsGroupSlidePaused(false)}
                    >
                      {GROUP_SLIDES.map((slide, index) => (
                        <div
                          key={slide.image}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === activeGroupSlide
                              ? 'z-10 opacity-100'
                              : 'z-0 opacity-0'
                          }`}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className={`h-full w-full object-cover transition-transform duration-[5000ms] ${
                              index === activeGroupSlide
                                ? 'scale-100'
                                : 'scale-110'
                            }`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-white via-ink-950/35 to-transparent" />
                        </div>
                      ))}

                      <div className="absolute left-5 top-5 z-30 sm:left-7 sm:top-7">
                        <div className="flex items-center gap-2 rounded-full border border-ink-900/15 bg-ink-950/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 backdrop-blur-md">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-brass-400" />
                          OS Group
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsGroupSlidePaused((value) => !value)}
                        className="absolute right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 bg-ink-950/35 text-ink-900 backdrop-blur-md transition hover:bg-white hover:text-ink-900 sm:right-7 sm:top-7"
                        aria-label={isGroupSlidePaused ? 'Play group slideshow' : 'Pause group slideshow'}
                      >
                        {isGroupSlidePaused ? (
                          <Play size={15} fill="currentColor" />
                        ) : (
                          <Pause size={15} />
                        )}
                      </button>

                      <div
                        key={activeGroupSlide}
                        className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8"
                      >
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brass-300">
                          {GROUP_SLIDES[activeGroupSlide].label}
                        </p>

                        <h3 className="max-w-xl font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
                          {GROUP_SLIDES[activeGroupSlide].title}
                        </h3>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-ink-900/75">
                          {GROUP_SLIDES[activeGroupSlide].subtitle}
                        </p>
                      </div>

                      <div className="absolute bottom-6 right-6 z-40 flex gap-2 sm:right-8">
                        <button
                          type="button"
                          onClick={previousGroupSlide}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 bg-ink-950/35 text-ink-900 backdrop-blur-md transition hover:bg-white hover:text-ink-900"
                          aria-label="Previous group slide"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={nextGroupSlide}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 bg-ink-950/35 text-ink-900 backdrop-blur-md transition hover:bg-white hover:text-ink-900"
                          aria-label="Next group slide"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 gap-2">
                        {GROUP_SLIDES.map((slide, index) => (
                          <button
                            key={slide.image}
                            type="button"
                            onClick={() => setActiveGroupSlide(index)}
                            aria-label={`Show group slide ${index + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === activeGroupSlide
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                </div>

                <div className="my-12 h-px bg-blue-100 lg:my-14" />

                <StaggerContainer
                  className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-5
                  "
                >

                  {companies.map((company) => (
                    <StaggerItem
                      key={company._id}
                    >

                      <Link
                        to={`/companies/${company.slug}`}
                        className="group block h-full"
                      >

                        <motion.article
                          className="
                            relative
                            h-full
                            min-h-[340px]
                            bg-white
                            rounded-[28px]
                            border
                            border-blue-100
                            p-7
                            overflow-hidden
                            shadow-os-soft
                          "
                          whileHover={{
                            y: -9,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                        >

                          {/* Decorative circle */}

                          <div
                            className="
                              absolute
                              -right-20
                              -top-20
                              w-52
                              h-52
                              rounded-full
                              bg-blue-50
                              group-hover:bg-blue-100
                              transition-colors
                            "
                          />


                          {/* =================================================
    COMPANY IMAGE / LOGO
    ================================================= */}

<div
  className="
    relative
    h-32
    rounded-2xl
    bg-gradient-to-br
    from-blue-50
    via-white
    to-cyan-50
    border
    border-blue-100
    flex
    items-center
    justify-center
    overflow-hidden
  "
>
  {company.coverImage || company.logo || company.slug === 'nlcits' ? (
    <motion.img
      src={company.coverImage || company.logo || (company.slug === 'nlcits' ? '/images/nlcits-logo.png' : undefined)}
      alt={`${company.name || 'Company'} logo`}
      className="
        h-full
        w-full
        object-contain
        p-5
      "
      loading="lazy"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.35 }}
      onError={(event) => {
        event.currentTarget.style.display = 'none';

        const fallback =
          event.currentTarget.parentElement?.querySelector(
            '[data-company-fallback]'
          );

        fallback?.classList.remove('hidden');
      }}
    />
  ) : null}

  <div
    data-company-fallback
    className={`
      ${company.coverImage || company.logo ? 'hidden' : ''}
      absolute
      inset-0
      flex
      h-full
      w-full
      items-center
      justify-center
      gap-3
      px-4
    `}
  >
    <span
      className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-blue-600
        to-cyan-400
        text-xl
        font-extrabold
        text-ink-900
        shadow-lg
        shadow-blue-600/20
      "
    >
      {(company.name || 'OS').slice(0, 2).toUpperCase()}
    </span>

    <span
      className="
        text-center
        text-sm
        font-bold
        leading-snug
        text-ink-900
      "
    >
      {company.name || 'OS Group Company'}
    </span>
  </div>
</div>


                          <div className="relative mt-7">

                            <h3
                              className="
                                text-xl
                                md:text-2xl
                                font-extrabold
                                text-ink-900
                                tracking-tight
                                group-hover:text-brass-500
                                transition-colors
                              "
                            >
                              {company.name}
                            </h3>

                            <p
                              className="
                                mt-3
                                text-sm
                                text-ash
                                leading-relaxed
                                line-clamp-3
                              "
                            >
                              {company.tagline}
                            </p>


                            <span
                              className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-bold
                                text-brass-500
                              "
                            >
                              Explore company

                              <ArrowRight
                                size={16}
                                className="os-arrow"
                              />
                            </span>

                          </div>

                        </motion.article>

                      </Link>

                    </StaggerItem>
                  ))}

                </StaggerContainer>

              </div>

            </section>
          )}


          {/* =================================================
              PROJECTS
              ================================================= */}

          {projects.length > 0 && (
            <section
              className="
                py-24
                lg:py-36
                bg-white
              "
            >

              <div className="container-page">

                <AnimatedSection
                  direction="up"
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    justify-between
                    gap-6
                    mb-14
                  "
                >

                  <div>

                    <p className="os-eyebrow mb-5">
                      Portfolio
                    </p>

                    <h2
                      className="
                        text-4xl
                        md:text-5xl
                        font-extrabold
                        tracking-[-0.04em]
                        text-ink-900
                      "
                    >
                      Recent work
                      <span className="text-ink-900">
                        {' '}across the group
                      </span>
                    </h2>

                  </div>

                  <Link
                    to="/projects"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-brass-500
                      group
                    "
                  >
                    View all projects

                    <ArrowRight
                      size={16}
                      className="os-arrow"
                    />
                  </Link>

                </AnimatedSection>


                <StaggerContainer
                  className="
                    grid
                    md:grid-cols-3
                    gap-6
                  "
                >

                  {projects.map((project) => (
                    <StaggerItem
                      key={project._id}
                      direction="scale"
                    >

                      <Link
                        to={`/projects/${project.slug}`}
                        className="group block"
                      >

                        <motion.div
                          className="
                            relative
                            aspect-[4/3]
                            rounded-[28px]
                            overflow-hidden
                            bg-blue-50
                            shadow-os-soft
                          "
                          whileHover={{
                            y: -6,
                          }}
                        >

                          {project.coverImage ? (
                            <motion.img
                              src={project.coverImage}
                              alt={project.name}
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                              whileHover={{
                                scale: 1.08,
                              }}
                              transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          ) : (
                            <div
                              className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                                bg-gradient-to-br
                                from-blue-100
                                to-cyan-50
                              "
                            >
                              <Briefcase
                                size={44}
                                className="text-brass-500"
                              />
                            </div>
                          )}

                          <div
                            className="
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-white/75
                              via-transparent
                              to-transparent
                            "
                          />

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

                              <h3
                                className="
                                  text-lg
                                  font-extrabold
                                  text-ink-900
                                "
                              >
                                {project.name}
                              </h3>

                              {project.client && (
                                <p
                                  className="
                                    text-xs
                                    text-ink-900/70
                                    mt-1
                                  "
                                >
                                  {project.client}
                                </p>
                              )}

                            </div>

                            <span
                              className="
                                w-11
                                h-11
                                rounded-full
                                bg-white
                                text-ink-900
                                flex
                                items-center
                                justify-center
                                shrink-0
                                group-hover:bg-brass-500
                                group-hover:text-ink-900
                                transition-colors
                              "
                            >
                              <ArrowRight
                                size={17}
                                className="os-arrow"
                              />
                            </span>

                          </div>

                        </motion.div>

                      </Link>

                    </StaggerItem>
                  ))}

                </StaggerContainer>

              </div>

            </section>
          )}


          {/* =================================================
              TESTIMONIALS
              ================================================= */}

          {testimonials.length > 0 && (
            <section
              className="
                relative
                py-24
                lg:py-32
                bg-[#f7faff]
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  w-[500px]
                  h-[500px]
                  rounded-full
                  bg-blue-100/40
                  blur-3xl
                  -left-64
                  top-20
                "
              />

              <div className="container-page relative">

                <AnimatedSection
                  direction="up"
                  className="max-w-2xl mb-14"
                >

                  <p className="os-eyebrow mb-5">
                    Client Voices
                  </p>

                  <h2
                    className="
                      text-4xl
                      md:text-5xl
                      font-extrabold
                      tracking-[-0.04em]
                      text-ink-900
                    "
                  >
                    What our
                    <span className="text-ink-900">
                      {' '}clients say
                    </span>
                  </h2>

                </AnimatedSection>


                <StaggerContainer
                  className="
                    grid
                    md:grid-cols-3
                    gap-5
                  "
                >

                  {testimonials.map((testimonial) => (
                    <StaggerItem
                      key={testimonial._id}
                    >

                      <motion.article
                        className="
                          h-full
                          bg-white
                          rounded-[28px]
                          border
                          border-blue-100
                          p-7
                          shadow-os-soft
                        "
                        whileHover={{
                          y: -7,
                        }}
                      >

                        <div
                          className="
                            text-5xl
                            leading-none
                            font-serif
                            text-brass-500/30
                          "
                        >
                          “
                        </div>

                        <p
                          className="
                            mt-3
                            text-ink-800
                            leading-relaxed
                          "
                        >
                          {testimonial.testimonial}
                        </p>

                        <div className="mt-7">

                          <p
                            className="
                              text-sm
                              font-extrabold
                              text-ink-900
                            "
                          >
                            {testimonial.clientName}
                          </p>

                          <p
                            className="
                              text-xs
                              text-ash
                              mt-1
                            "
                          >
                            {testimonial.designation}

                            {testimonial.company
                              ? `, ${testimonial.company}`
                              : ''}
                          </p>

                        </div>

                      </motion.article>

                    </StaggerItem>
                  ))}

                </StaggerContainer>

              </div>

            </section>
          )}


          {/* =================================================
              NEWS
              ================================================= */}

          {news.length > 0 && (
            <section
              className="
                py-24
                lg:py-32
                bg-white
              "
            >

              <div
                className="
                  container-page
                  max-w-5xl
                "
              >

                <AnimatedSection
                  direction="up"
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    justify-between
                    gap-5
                    mb-12
                  "
                >

                  <div>

                    <p className="os-eyebrow mb-5">
                      Newsroom
                    </p>

                    <h2
                      className="
                        text-4xl
                        md:text-5xl
                        font-extrabold
                        tracking-[-0.04em]
                        text-ink-900
                      "
                    >
                      Major
                      <span className="text-ink-900">
                        {' '}highlights
                      </span>
                    </h2>

                  </div>

                  <Link
                    to="/news"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-brass-500
                      group
                    "
                  >
                    Visit newsroom

                    <ArrowRight
                      size={16}
                      className="os-arrow"
                    />
                  </Link>

                </AnimatedSection>


                <StaggerContainer
                  className="
                    divide-y
                    divide-blue-100
                    border-t
                    border-b
                    border-blue-100
                  "
                >

                  {news.map((item) => (
                    <StaggerItem
                      key={item._id}
                    >

                      <Link
                        to={`/news/${item.slug}`}
                        className="
                          group
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          justify-between
                          gap-4
                          py-7
                        "
                      >

                        <div className="flex-1">

                          {item.publishedAt && (
                            <span
                              className="
                                block
                                text-xs
                                text-ash
                                mb-2
                              "
                            >
                              {format(
                                new Date(item.publishedAt),
                                'MMMM d, yyyy'
                              )}
                            </span>
                          )}

                          <span
                            className="
                              block
                              text-lg
                              md:text-xl
                              font-extrabold
                              text-ink-900
                              group-hover:text-brass-500
                              transition-colors
                            "
                          >
                            {item.title}
                          </span>

                        </div>


                        <span
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-blue-50
                            text-brass-500
                            flex
                            items-center
                            justify-center
                            shrink-0
                            group-hover:bg-brass-500
                            group-hover:text-ink-900
                            transition-all
                          "
                        >
                          <ArrowRight
                            size={17}
                            className="os-arrow"
                          />
                        </span>

                      </Link>

                    </StaggerItem>
                  ))}

                </StaggerContainer>

              </div>

            </section>
          )}


          {/* =================================================
              FINAL CTA
              ================================================= */}

          <section
            className="
              relative
              min-h-[500px]
              flex
              items-center
              bg-ink-950
              text-ink-900
              overflow-hidden
            "
          >

            <GradientMesh />

            <div
              className="
                absolute
                inset-0
                os-grid
                opacity-10
              "
            />


            <motion.div
              className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                bg-brass-500/20
                blur-3xl
                -right-40
                top-1/2
                -translate-y-1/2
              "
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />


            <AnimatedSection
              direction="scale"
              className="
                container-page
                relative
                z-10
                py-24
                text-center
              "
            >

              <p className="os-eyebrow !text-os-cyan-300 justify-center mb-6">
                Let's build together
              </p>

              <h2
                className="
                  text-4xl
                  md:text-6xl
                  lg:text-7xl
                  font-extrabold
                  tracking-[-0.05em]
                  leading-[0.95]
                  max-w-4xl
                  mx-auto
                "
              >
                Have a project
                <span className="block text-ink-900">
                  in mind?
                </span>
              </h2>

              <p
  className="
    mt-6
    text-base
    md:text-lg
    text-black
    max-w-xl
    mx-auto
    leading-relaxed
  "
>
  Tell us what you're building. Our team will
  connect you with the right company and
  capability within OS Group.
</p>

              <MagneticButton
                as={Link}
                to="/contact"
                className="
                  os-button
                  mt-9
                  inline-flex
                  !bg-white
                  !text-ink-900
                "
              >
                Start a Conversation

                <ArrowRight
                  size={17}
                  className="os-arrow"
                />
              </MagneticButton>

            </AnimatedSection>

          </section>

        </>
      )}

    </div>
  );
}