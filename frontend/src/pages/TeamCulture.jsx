import { useEffect, useState } from 'react';
import { Heart, Users2, HandHeart, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import api from '../services/api';
import { Loading } from '../components/UI';
import SEO from '../components/SEO';

const PILLARS = [
  {
    icon: Users2,
    title: 'One Team, Many Companies',
    text: 'Every employee across the group shares the same standard of care for clients and colleagues, regardless of which company they work for.',
  },
  {
    icon: HandHeart,
    title: 'Community First',
    text: 'OS Group companies invest time and resources back into the communities where they operate — not as an afterthought, but as part of how we do business.',
  },
  {
    icon: Sparkles,
    title: 'Room to Grow',
    text: "People move between companies within the group as their careers develop, carrying what they've learned into new challenges.",
  },
];

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

function PillarCard({ pillar, index }) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-lavender-100 bg-white p-7 shadow-sm"
    >
      <div className="absolute left-0 top-0 h-1 w-full bg-lavender-200 transition-colors duration-300 group-hover:bg-brass-500" />

      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lavender-50 text-brass-500">
          <Icon size={24} strokeWidth={1.7} />
        </div>

        <span className="font-serif text-3xl text-lavender-200">
          0{index + 1}
        </span>
      </div>

      <h3 className="font-serif text-2xl font-semibold leading-tight text-ink-900">
        {pillar.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-ash">{pillar.text}</p>

      <div className="mt-auto flex items-center justify-between border-t border-lavender-100 pt-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-ash">
          Our Value
        </span>
        <ArrowUpRight
          size={18}
          className="text-brass-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </motion.article>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section className="bg-ink-900 py-20 text-white md:py-24">
      <div className="container-page">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs uppercase tracking-[0.25em] text-brass-300"
          >
            In Their Words
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="flex items-center gap-3 font-serif text-3xl font-semibold md:text-4xl"
          >
            <Heart size={27} className="text-brass-400" />
            Voices from the group
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial._id}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <p className="leading-7 text-white/75 italic">
                “{testimonial.testimonial}”
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-medium text-white">
                  {testimonial.clientName}
                </p>
                <p className="mt-1 text-xs text-white/45">
                  {testimonial.designation}
                  {testimonial.company ? `, ${testimonial.company}` : ''}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function TeamCulture() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    api
      .get('/testimonials?limit=3')
      .then((res) => {
        if (mounted) setTestimonials(res.data?.data || []);
      })
      .catch(() => {
        if (mounted) setTestimonials([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="The Heart of OS Group"
        description="Discover the people, culture and values at the heart of OS Group of Company."
      />

      {/* Hero */}
      <section className="border-b border-lavender-100 bg-white">
        <div className="container-page grid items-center gap-10 py-14 md:py-18 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs uppercase tracking-[0.25em] text-brass-500"
            >
              Our People
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
            >
              The Heart of{' '}
              <span className="text-brass-500">OS Group.</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-7 h-px w-20 bg-brass-500"
            />

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-base leading-8 text-ash sm:text-lg"
            >
              Beyond the balance sheets and the buildings, OS Group is the
              people who show up every day to do the work properly.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-lavender-100 bg-lavender-50 p-2 shadow-sm">
              <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[430px]">
                <motion.img
                  initial={{ scale: reduceMotion ? 1 : 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease }}
                  src="/images/team.jpg"
                  alt="OS Group team"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-7 pt-20">
                  <p className="text-xs uppercase tracking-[0.2em] text-brass-300">
                    Culture
                  </p>
                  <p className="mt-2 font-serif text-2xl text-white">
                    People are our foundation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FCFBFF] py-16 md:py-20">
        <div className="container-page">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10 max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs uppercase tracking-[0.25em] text-brass-500"
            >
              What Matters To Us
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl font-semibold leading-tight text-ink-900 md:text-5xl"
            >
              The values that shape how we work.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {PILLARS.map((pillar, index) => (
              <PillarCard
                key={pillar.title}
                pillar={pillar}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <Testimonials testimonials={testimonials} />
      )}

      {loading && <Loading />}
    </main>
  );
}
