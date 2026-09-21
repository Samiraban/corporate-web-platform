import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Megaphone, Sparkles, MoveUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';
import { Loading, EmptyState } from '../components/UI';
import { sanitizeHtml } from '../utils/sanitizeHtml';

const ease = [0.16, 1, 0.3, 1];

const TYPE_LABEL = {
  announcement: 'Announcement',
  launch: 'Launch',
  project: 'Project',
  partnership: 'Partnership',
  event: 'Event',
  achievement: 'Achievement',
  press_release: 'Press Release',
};

const fallbackImages = [
  '/images/os-group-global.jpg',
  '/images/os-group-leadership.jpg',
  '/images/os-group-office.jpg',
  '/images/os-group-project.jpg',
  '/images/os-group-team.jpg',
];

const revealUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const revealLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const revealRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

function getImage(item, index = 0) {
  return item?.coverImage || fallbackImages[index % fallbackImages.length];
}

function getDate(item) {
  if (!item?.publishedAt) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(item.publishedAt));
  } catch {
    return '';
  }
}

function getType(item) {
  return TYPE_LABEL[item?.type] || 'News';
}

function NewsCard({ item, index, reducedMotion }) {
  const image = getImage(item, index + 1);
  const date = getDate(item);

  return (
    <motion.article
      variants={reducedMotion ? undefined : index % 2 === 0 ? revealLeft : revealRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      className="group overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.07)]"
    >
      <Link
        to={`/news/${item.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[16/8.5] overflow-hidden bg-lavender-50">
          <motion.img
            src={image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={reducedMotion ? undefined : { scale: 1.045 }}
            transition={{ duration: 0.65, ease }}
            onError={(event) => {
              event.currentTarget.src = fallbackImages[0];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lavender-700 shadow-sm backdrop-blur-sm">
            <Megaphone size={13} aria-hidden="true" />
            {getType(item)}
          </div>

          <motion.div
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-lavender-800 shadow-sm backdrop-blur-sm"
            whileHover={reducedMotion ? undefined : { rotate: 8, scale: 1.06 }}
          >
            <MoveUpRight size={17} aria-hidden="true" />
          </motion.div>
        </div>

        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-600">
            <span className="h-px w-7 bg-lavender-300" />
            {date || 'OS Group'}
          </div>

          <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink-900 transition-colors duration-300 group-hover:text-lavender-600 sm:text-3xl">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-ink-600 sm:text-[15px]">
              {item.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-lavender-100 pt-5">
            <span className="flex items-center gap-2 text-xs font-medium text-ink-500">
              <CalendarDays size={14} aria-hidden="true" />
              {date || 'Latest update'}
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

function FeaturedNews({ item, reducedMotion }) {
  if (!item) return null;

  const image = getImage(item, 0);
  const date = getDate(item);

  return (
    <motion.section
      variants={reducedMotion ? undefined : revealUp}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.1 }}
      className="mt-12"
    >
      <Link
        to={`/news/${item.slug}`}
        className="group grid overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-white shadow-[0_20px_55px_rgba(87,67,130,0.1)] lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="relative min-h-[330px] overflow-hidden bg-lavender-50 sm:min-h-[430px]">
          <motion.img
            src={image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            whileHover={reducedMotion ? undefined : { scale: 1.045 }}
            transition={{ duration: 0.75, ease }}
            onError={(event) => {
              event.currentTarget.src = fallbackImages[0];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />
          <div className="absolute left-6 top-6 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lavender-700 shadow-sm backdrop-blur-sm">
            Featured update
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden bg-lavender-50/70 p-7 sm:p-9 lg:p-12">
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-lavender-200/70" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-600">
              <Sparkles size={13} aria-hidden="true" />
              {getType(item)}
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-4xl lg:text-5xl">
              {item.title}
            </h2>
            {item.excerpt && (
              <p className="mt-5 text-base leading-7 text-ink-600 sm:text-lg">
                {item.excerpt}
              </p>
            )}
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-lavender-200 pt-5">
            <span className="flex items-center gap-2 text-xs font-medium text-ink-500">
              <CalendarDays size={14} aria-hidden="true" />
              {date || 'Latest update'}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-lavender-700">
              Read announcement
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}


const blurReveal = {
  hidden: { opacity: 0, y: 80, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function ParallaxImage({ src, alt, className = '', priority = false, zoom = 1.1 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const smoothY = useSpring(y, { stiffness: 70, damping: 22, mass: 0.5 });

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        style={reduceMotion ? undefined : { y: smoothY }}
        initial={reduceMotion ? false : { scale: zoom }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.25, ease }}
        whileHover={reduceMotion ? undefined : { scale: 1.055 }}
        className="absolute inset-0 w-full h-[114%] -top-[7%] object-cover"
        onError={(event) => {
          event.currentTarget.src = fallbackImages[0];
        }}
      />
    </motion.div>
  );
}

export function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('all');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    api
      .get('/news?status=published&limit=50&sort=-publishedAt')
      .then((response) => {
        if (!mounted) return;
        const data = response?.data?.data || response?.data || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Failed to load news:', error);
        if (mounted) setItems([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const types = useMemo(() => {
    const found = [];
    items.forEach((item) => {
      if (item.type && TYPE_LABEL[item.type] && !found.includes(item.type)) {
        found.push(item.type);
      }
    });
    return found;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeType === 'all') return items;
    return items.filter((item) => item.type === activeType);
  }, [items, activeType]);

  const featuredItem = filteredItems[0];
  const regularItems = filteredItems.slice(1);

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="News & Announcements"
        description="Latest news, announcements, launches, partnerships and milestones from across the OS Group of Company network."
      />

      {/* HERO */}
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
                <Megaphone size={13} aria-hidden="true" />
                OS Group newsroom
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900">
                News &
                <br />
                <span className="text-lavender-600">announcements.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                Follow the latest developments across OS Group — from launches and partnerships to projects, achievements and important announcements.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="#news"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Explore updates
                  <ArrowDown size={16} aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Contact OS Group
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
                src="/images/os-group-global.jpg"
                alt="OS Group global network"
                className="absolute inset-0 h-full w-full object-cover"
                initial={reducedMotion ? false : { scale: 1.06 }}
                animate={reducedMotion ? undefined : { scale: 1 }}
                transition={{ duration: 1.2, ease }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/70 via-[#6f52ad]/10 to-white/5" />

              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
                transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-5 top-5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-7 sm:top-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">Across the group</p>
                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">People. Progress. Partnerships.</p>
              </motion.div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">What you'll find</p>
                      <p className="mt-2 max-w-md font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                        The latest stories from OS Group.
                      </p>
                    </div>
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender-600 text-white sm:flex">
                      <ArrowRight size={18} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section id="news" className="container-page py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={reducedMotion ? undefined : revealUp}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.12 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
            <span className="h-px w-8 bg-lavender-300" />
            The newsroom
          </div>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink-900 sm:text-5xl lg:text-6xl">
            What is happening across the group.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink-600 sm:text-lg">
            Discover the latest announcements, milestones, partnerships, events and projects from OS Group and its companies.
          </p>
        </motion.div>

        {loading ? (
          <div className="py-20">
            <Loading />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16">
            <EmptyState title="No news yet" />
          </div>
        ) : (
          <>
            {types.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-y border-lavender-100 py-4">
                {[
                  { id: 'all', name: 'All updates' },
                  ...types.map((type) => ({ id: type, name: TYPE_LABEL[type] })),
                ].map((type) => {
                  const active = activeType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setActiveType(type.id)}
                      className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 ${
                        active
                          ? 'border-lavender-600 bg-lavender-600 text-white shadow-[0_8px_20px_rgba(111,82,173,0.16)]'
                          : 'border-lavender-200 bg-white text-ink-600 hover:border-lavender-400 hover:bg-lavender-50 hover:text-lavender-700'
                      }`}
                    >
                      {type.name}
                    </button>
                  );
                })}
              </div>
            )}

            <FeaturedNews item={featuredItem} reducedMotion={reducedMotion} />

            <div className="mt-16 flex items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
                  <span className="h-px w-8 bg-lavender-300" />
                  Latest updates
                </div>
                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.025em] text-ink-900 sm:text-4xl">
                  From the newsroom
                </h2>
              </div>
              <span className="hidden rounded-full bg-lavender-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-lavender-700 sm:inline-flex">
                {regularItems.length} updates
              </span>
            </div>

            {regularItems.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {regularItems.map((item, index) => (
                  <NewsCard
                    key={item._id || item.slug || index}
                    item={item}
                    index={index}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[1.35rem] border border-lavender-200 bg-white px-6 py-14 text-center shadow-[0_12px_40px_rgba(87,67,130,0.05)]">
                <p className="text-ink-500">No other updates in this category.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-lavender-100 bg-lavender-50/70">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
            className="overflow-hidden rounded-[1.75rem] bg-[#30254a] px-7 py-10 text-white shadow-[0_20px_55px_rgba(48,37,74,0.16)] sm:px-10 sm:py-12 lg:px-14"
          >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-300">Stay connected</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Keep up with OS Group.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                  Explore our companies, projects and people, or get in touch to start a conversation.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#30254a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-50"
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


export function NewsDetail() {
  const { slug } = useParams();

  const [
    item,
    setItem,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const reduceMotion =
    useReducedMotion();

  const {
    scrollYProgress,
  } = useScroll();

  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 25,
      }
    );

  useEffect(() => {
    setLoading(true);

    api
      .get(`/news/slug/${slug}`)
      .then((res) =>
        setItem(
          res.data.data
        )
      )
      .catch(() =>
        setItem(null)
      )
      .finally(() =>
        setLoading(false)
      );
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (!item) {
    return (
      <EmptyState
        title="Article not found"
      />
    );
  }

  const image =
    item.coverImage;

  return (
    <article className="bg-white overflow-hidden">
      <SEO
        title={item.title}
        description={item.excerpt}
        image={item.coverImage}
      />

      {/* READING BAR */}

      {!reduceMotion && (
        <motion.div
          style={{
            scaleX: progress,
          }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-brass-500 origin-left z-[70]"
        />
      )}

      {/* =====================================================
          DETAIL HERO
      ===================================================== */}

      <header className="relative bg-ink-900 text-white overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full border border-white/[0.06]"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute -left-24 bottom-[-180px] w-[420px] h-[420px] rounded-full bg-brass-500/[0.07] blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    0,
                    30,
                    0,
                  ],

                  y: [
                    0,
                    -20,
                    0,
                  ],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="container-page py-16 md:py-24 lg:py-28 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            {/* BACK */}

            <motion.div
              variants={fadeUp}
              className="mb-7"
            >
              <Link
                to="/news"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{
                    x: -5,
                  }}
                >
                  <ArrowLeft
                    size={15}
                  />
                </motion.span>

                Back to newsroom
              </Link>
            </motion.div>

            {/* TYPE */}

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
            >
              <span className="text-brass-400 text-xs md:text-sm font-semibold uppercase tracking-[0.22em]">
                {getType(item)}
              </span>

              <span className="w-1 h-1 bg-white/30 rounded-full" />

              <span className="text-white/40 text-xs uppercase tracking-[0.18em]">
                OS Group
              </span>
            </motion.div>

            {/* TITLE */}

            <motion.h1
              variants={blurReveal}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.98] mt-5 max-w-4xl"
            >
              {item.title}
            </motion.h1>

            {/* DATE */}

            {item.publishedAt && (
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 mt-7 text-sm text-white/55"
              >
                <CalendarDays
                  size={14}
                />

                {format(
                  new Date(
                    item.publishedAt
                  ),
                  'MMMM d, yyyy'
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </header>

      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <main className="container-page max-w-5xl">
        {image && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 60,
                    scale: 0.98,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.05,
              delay: 0.2,
              ease,
            }}
            className="relative -mt-8 md:-mt-12 z-20"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <ParallaxImage
                src={image}
                alt={item.title}
                className="w-full h-full"
                zoom={1.1}
              />
            </div>
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto pb-24 md:pb-32">
          {/* EXCERPT */}

          {item.excerpt && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.4,
              }}
              variants={blurReveal}
              className="font-serif text-xl md:text-2xl text-ink-900 leading-relaxed mt-14 md:mt-18 mb-10"
            >
              {item.excerpt}
            </motion.p>
          )}

          {/* CONTENT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.08,
            }}
            transition={{
              duration: 0.85,
              ease,
            }}
            className="mt-10 text-ink-800 leading-relaxed
              [&>p]:mb-5
              [&>h2]:font-serif
              [&>h2]:text-2xl
              [&>h2]:font-semibold
              [&>h2]:text-ink-900
              [&>h2]:mt-10
              [&>h2]:mb-4
              [&>h3]:font-serif
              [&>h3]:text-xl
              [&>h3]:font-semibold
              [&>h3]:text-ink-900
              [&>h3]:mt-8
              [&>h3]:mb-3
              [&>ul]:list-disc
              [&>ul]:pl-6
              [&>ul]:mb-5
              [&>ol]:list-decimal
              [&>ol]:pl-6
              [&>ol]:mb-5
              [&>blockquote]:border-l-2
              [&>blockquote]:border-brass-500
              [&>blockquote]:pl-5
              [&>blockquote]:italic
              [&>img]:w-full
              [&>img]:my-8"
            dangerouslySetInnerHTML={{
              __html:
                sanitizeHtml(
                  item.content
                ),
            }}
          />

          {/* BACK */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="mt-12"
          >
            <Link
              to="/news"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-ink-900 hover:text-brass-500 transition-colors"
            >
              <motion.span
                whileHover={{
                  x: -5,
                }}
              >
                <ArrowLeft
                  size={17}
                />
              </motion.span>

              Back to all news
            </Link>
          </motion.div>
        </div>
      </main>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative bg-ink-900 text-white overflow-hidden">
        <motion.div
          className="absolute -right-40 -bottom-40 w-[500px] h-[500px] rounded-full border border-white/[0.05]"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="container-page py-20 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brass-400 font-bold">
              Keep exploring
            </p>

            <h2 className="font-serif text-3xl md:text-5xl font-semibold mt-3">
              More from OS Group
            </h2>
          </div>

          <Link
            to="/news"
            className="group inline-flex items-center gap-4 self-start md:self-auto border border-white/25 px-6 py-4 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-all"
          >
            Explore newsroom

            <motion.span
              whileHover={{
                x: 7,
                rotate: -5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 18,
              }}
            >
              <ArrowUpRight
                size={18}
              />
            </motion.span>
          </Link>
        </div>
      </section>
    </article>
  );
}

export default News;
