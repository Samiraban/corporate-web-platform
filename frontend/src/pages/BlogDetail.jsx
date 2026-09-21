import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';
import { sanitizeHtml } from '../utils/sanitizeHtml';

const ease = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

/* =========================================================
   ARTICLE COVER IMAGE
========================================================= */

function ArticleImage({ src, alt }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['-5%', '5%']
  );

  const smoothY = useSpring(y, {
    stiffness: 65,
    damping: 22,
  });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden w-full aspect-video bg-ink-100"
      initial={
        reduceMotion
          ? false
          : {
              clipPath: 'inset(8% 3% 8% 3%)',
              opacity: 0,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 1.1,
        ease,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={
          reduceMotion
            ? undefined
            : {
                y: smoothY,
              }
        }
        initial={
          reduceMotion
            ? false
            : {
                scale: 1.1,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                scale: 1,
              }
        }
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
        className="absolute inset-0 w-full h-[110%] -top-[5%] object-cover"
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        initial={{
          opacity: 0.4,
        }}
        whileHover={{
          opacity: 0.7,
        }}
        transition={{
          duration: 0.45,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   ARTICLE CONTENT
========================================================= */

function AnimatedContent({ html }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={stagger}
      className="prose-content mt-10 text-ink-800 leading-relaxed
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
    >
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   BLOG DETAIL
========================================================= */

export default function BlogDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const progress = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      ['0%', '100%']
    ),
    {
      stiffness: 90,
      damping: 25,
    }
  );

  useEffect(() => {
    setLoading(true);

    api
      .get(`/blogs/slug/${slug}`)
      .then((res) =>
        setPost(res.data.data)
      )
      .catch(() =>
        setPost(null)
      )
      .finally(() =>
        setLoading(false)
      );
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <EmptyState title="Post not found" />
    );
  }

  const coverImage =
    post.coverImage ||
    post.image;

  return (
    <article className="bg-white overflow-hidden">
      <SEO
        title={post.title}
        description={
          post.excerpt ||
          post.summary
        }
        image={post.coverImage}
      />

      {/* =====================================================
          READING PROGRESS
      ===================================================== */}

      {!reduceMotion && (
        <motion.div
          style={{
            scaleX: progress,
          }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-brass-500 origin-left z-[60]"
        />
      )}

      {/* =====================================================
          ANIMATED ARTICLE HEADER
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
                  x: [0, 30, 0],
                  y: [0, -20, 0],
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
            {/* BACK BUTTON */}

            <motion.div
              variants={reveal}
              className="mb-7"
            >
              <Link
                to="/blog"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{
                    x: -5,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 18,
                  }}
                >
                  <ArrowLeft size={15} />
                </motion.span>

                Back to insights
              </Link>
            </motion.div>

            {/* CATEGORY */}

            {post.category?.name && (
              <motion.p
                variants={reveal}
                className="text-brass-400 text-xs md:text-sm font-semibold uppercase tracking-[0.22em]"
              >
                {post.category.name}
              </motion.p>
            )}

            {/* TITLE */}

            <motion.h1
              variants={reveal}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.98] mt-5 max-w-4xl"
            >
              {post.title}
            </motion.h1>

            {/* META */}

            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7 text-sm text-white/55"
            >
              {post.author?.name && (
                <span>
                  {post.author.name}
                </span>
              )}

              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <CalendarDays size={14} />

                  {format(
                    new Date(
                      post.publishedAt
                    ),
                    'MMMM d, yyyy'
                  )}
                </span>
              )}

              {post.readingTimeMinutes && (
                <span className="flex items-center gap-2">
                  <Clock3 size={14} />

                  {post.readingTimeMinutes}{' '}
                  min read
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <main className="container-page max-w-5xl">
        {coverImage && (
          <motion.div
            className="relative -mt-8 md:-mt-12 z-20"
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
              delay: 0.25,
              ease,
            }}
          >
            <ArticleImage
              src={coverImage}
              alt={post.title}
            />
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto pb-24 md:pb-32">
          {/* EXCERPT */}

          {post.excerpt && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.4,
              }}
              variants={reveal}
              className="font-serif text-xl md:text-2xl text-ink-900 leading-relaxed mt-14 md:mt-18 mb-10"
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* ARTICLE CONTENT */}

          <AnimatedContent
            html={sanitizeHtml(
              post.content
            )}
          />

          {/* TAGS */}

          {post.tags?.length > 0 && (
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                ease,
              }}
              className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-ink-100"
            >
              {post.tags.map(
                (t, index) => (
                  <motion.span
                    key={t}
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.04,
                      ease,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    className="text-xs px-3 py-1.5 bg-ink-50 text-ink-700"
                  >
                    #{t}
                  </motion.span>
                )
              )}
            </motion.div>
          )}

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
              to="/blog"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-ink-900 hover:text-brass-500 transition-colors"
            >
              <motion.span
                whileHover={{
                  x: -5,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18,
                }}
              >
                <ArrowLeft size={17} />
              </motion.span>

              Back to all insights
            </Link>
          </motion.div>
        </div>
      </main>

      {/* =====================================================
          MORE INSIGHTS
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
          ease,
        }}
        className="bg-ink-900 text-white overflow-hidden"
      >
        <div className="container-page py-20 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brass-400 font-bold">
              Keep exploring
            </p>

            <h2 className="font-serif text-3xl md:text-5xl font-semibold mt-3">
              More from OS Group
            </h2>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-4 self-start md:self-auto border border-white/25 px-6 py-4 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-all"
          >
            Explore insights

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
              <ArrowUpRight size={18} />
            </motion.span>
          </Link>
        </div>
      </motion.section>

      {/* =====================================================
          FINAL ANIMATED LINE
      ===================================================== */}

      <motion.div
        className="h-px bg-brass-500/30 origin-left"
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
      />
    </article>
  );
}
