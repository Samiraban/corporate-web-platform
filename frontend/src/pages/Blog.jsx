import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import api from '../services/api';
import SEO from '../components/SEO';
import { Loading, EmptyState } from '../components/UI';

const fallbackImages = [
  '/images/os-group-global.jpg',
  '/images/os-group-leadership.jpg',
  '/images/os-group-office.jpg',
  '/images/os-group-project.jpg',
  '/images/os-group-team.jpg',
];

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function getImage(post, index = 0) {
  return post?.coverImage || post?.image || fallbackImages[index % fallbackImages.length];
}

function getDate(post) {
  if (!post?.publishedAt) return '';
  try {
    return format(new Date(post.publishedAt), 'MMM d, yyyy');
  } catch {
    return '';
  }
}

function getCategory(post) {
  return post?.category?.name || 'OS Group';
}

function ImageCard({ src, alt, className = '', priority = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = fallbackImages[0];
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
    </div>
  );
}

function BlogHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white border-b border-lavender-100">
      <div className="container-page py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-700">
                Our insights
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-semibold leading-[0.92] tracking-[-0.04em] text-ink-900"
            >
              Ideas that
              <br />
              <span className="text-brass-500">move us</span>
              <br />
              forward.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-ink-500"
            >
              Perspectives, stories and practical insights from across OS Group —
              covering our businesses, people, projects and the ideas shaping what comes next.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
              <span className="h-[2px] w-14 bg-brass-500" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink-500">
                Explore our journal
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-[0_25px_70px_rgba(31,27,67,0.12)] bg-lavender-50">
              <motion.img
                src="/images/os-group-global.jpg"
                alt="OS Group global network"
                loading="eager"
                animate={reduceMotion ? undefined : { scale: [1.02, 1.05, 1.02] }}
                transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = fallbackImages[0];
                }}
              />
              <div className="absolute inset-0 bg-ink-900/10" />

              <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 rounded-2xl bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-lg">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink-500">
                  Across the group
                </p>
                <h2 className="mt-2 font-serif text-2xl md:text-3xl font-semibold text-ink-900 leading-tight">
                  People. Business. Perspective.
                </h2>
              </div>

              <div className="absolute left-6 right-6 bottom-6 md:left-8 md:right-8 md:bottom-8 rounded-2xl bg-white/95 p-5 md:p-6 shadow-lg">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brass-500">
                  The OS Group journal
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="font-serif text-xl md:text-2xl font-semibold text-ink-900">
                    Ideas worth sharing.
                  </p>
                  <span className="hidden sm:flex h-10 w-10 rounded-full bg-brass-500 text-white items-center justify-center">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({ post }) {
  if (!post) return null;

  const image = getImage(post, 0);
  const date = getDate(post);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className="container-page py-16 md:py-20"
    >
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.22em] font-bold text-brass-500">
            Featured insight
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-900">
            Worth a closer look.
          </h2>
        </div>
      </div>

      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-[28px] bg-ink-900 shadow-[0_25px_70px_rgba(31,27,67,0.12)] transition-transform duration-500 group-hover:-translate-y-1">
          <div className="relative min-h-[340px] lg:min-h-[500px]">
            <ImageCard src={image} alt={post.title} className="absolute inset-0 w-full h-full" priority />
            <div className="absolute top-6 left-6 rounded-full bg-white px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-bold text-ink-900">
              Featured
            </div>
          </div>

          <div className="relative flex flex-col justify-between p-7 md:p-10 lg:p-12 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-bold text-brass-400">
                {getCategory(post)}
              </p>
              <h3 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.02] font-semibold">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-6 text-white/65 leading-relaxed text-base md:text-lg">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-5 text-xs text-white/50 mb-7">
                {date && (
                  <span className="flex items-center gap-2">
                    <CalendarDays size={14} /> {date}
                  </span>
                )}
                {post.readingTimeMinutes && (
                  <span className="flex items-center gap-2">
                    <Clock3 size={14} /> {post.readingTimeMinutes} min read
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-semibold border-b border-white/25 pb-3">
                Read the full story
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}

function ArticleCard({ post, index }) {
  const image = getImage(post, index + 1);
  const date = getDate(post);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-lavender-50">
          <ImageCard src={image} alt={post.title} className="absolute inset-0 w-full h-full" />
          <div className="absolute right-5 bottom-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-900 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className="pt-6">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] font-bold">
            <span className="text-brass-500">{getCategory(post)}</span>
            {date && <span className="h-1 w-1 rounded-full bg-ink-300" />}
            {date && <span className="text-ink-400">{date}</span>}
          </div>

          <h3 className="mt-4 font-serif text-2xl md:text-3xl leading-[1.08] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brass-500">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-4 text-sm md:text-base text-ink-500 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-700">
            Read article
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    let active = true;

    api
      .get('/blogs?status=published&limit=50&sort=-publishedAt')
      .then((res) => {
        if (active) setPosts(res.data?.data || []);
      })
      .catch(() => {
        if (active) setPosts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const map = new Map();

    posts.forEach((post) => {
      if (post.category?._id && post.category?.name) {
        map.set(post.category._id, post.category.name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [posts]);

  const featuredPost = useMemo(
    () => posts.find((post) => post.isFeatured) || posts[0],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts;
    return posts.filter((post) => post.category?._id === activeCategory);
  }, [posts, activeCategory]);

  const regularPosts = filteredPosts.filter(
    (post) => post._id !== featuredPost?._id
  );

  return (
    <main className="overflow-hidden bg-white text-ink-900">
      <SEO
        title="Blog"
        description="Perspectives, updates, and lessons from across the OS Group."
      />

      <BlogHero />

      {loading ? (
        <div className="container-page py-20">
          <Loading />
        </div>
      ) : posts.length === 0 ? (
        <div className="container-page py-20">
          <EmptyState title="No posts yet" />
        </div>
      ) : (
        <>
          <FeaturedArticle post={featuredPost} />

          <section className="container-page pb-16 md:pb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-ink-100 pb-7">
              <div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.22em] font-bold text-brass-500">
                  From the journal
                </p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold text-ink-900">
                  Latest insights.
                </h2>
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      activeCategory === 'all'
                        ? 'bg-brass-500 text-white'
                        : 'border border-ink-200 bg-white text-ink-700 hover:border-brass-400 hover:text-brass-500'
                    }`}
                  >
                    All
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        activeCategory === category.id
                          ? 'bg-brass-500 text-white'
                          : 'border border-ink-200 bg-white text-ink-700 hover:border-brass-400 hover:text-brass-500'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {regularPosts.length > 0 ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14 pt-10"
              >
                {regularPosts.map((post, index) => (
                  <ArticleCard key={post._id} post={post} index={index} />
                ))}
              </motion.div>
            ) : (
              <div className="py-16 text-center text-ink-500">
                No other articles in this category.
              </div>
            )}
          </section>

          <section className="relative overflow-hidden bg-ink-900 text-white">
            <div className="container-page py-16 md:py-20">
              <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.22em] font-bold text-brass-400">
                    Stay connected
                  </p>
                  <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                    Have an idea worth
                    <span className="text-white/35"> discussing?</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-white/60 leading-relaxed">
                    Learn more about OS Group, our companies, projects and the people behind our work.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-brass-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1"
                >
                  Start a conversation
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
