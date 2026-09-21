import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import AboutSubNav from '../../components/AboutSubNav';
import SEO from '../../components/SEO';

const ease = [0.16, 1, 0.3, 1];

const images = {
  office: '/images/os-group-office.jpg',
  team: '/images/os-group-team.jpg',
  leadership: '/images/os-group-leadership.jpg',
  project: '/images/os-group-project.jpg',
  global: '/images/os-group-global.jpg',
};

const values = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Integrity',
    text: 'We build relationships through honesty, responsibility and consistent action.',
  },
  {
    number: '02',
    icon: Target,
    title: 'Quality',
    text: 'We hold ourselves to high standards across every company and every project.',
  },
  {
    number: '03',
    icon: Users,
    title: 'People',
    text: 'People and partnerships remain at the centre of everything we build.',
  },
  {
    number: '04',
    icon: Globe2,
    title: 'Progress',
    text: 'We pursue opportunities that create sustainable and meaningful growth.',
  },
];

const stats = [
  ['01', 'Group'],
  ['04+', 'Industries'],
  ['10+', 'Markets'],
  ['∞', 'Possibilities'],
];

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const reduceMotion = useReducedMotion();
  const offsets = {
    up: { x: 0, y: 26 },
    left: { x: -34, y: 0 },
    right: { x: 34, y: 0 },
  };
  const offset = offsets[direction] || offsets.up;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function ImageFrame({ src, alt, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`group relative overflow-hidden rounded-[24px] border border-[#dfd4f3] bg-[#f5f0fc] shadow-[0_14px_40px_rgba(82,58,128,0.08)] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#34204d]/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#b993e6] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

export default function WhoWeAre() {
  const [activeValue, setActiveValue] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Who We Are | OS Group"
        description="Discover who OS Group is, our story, values, people and vision for sustainable growth."
      />

      <main className="overflow-hidden bg-white text-ink-900">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#e6def2] bg-[#faf8fe]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#e6d9f8]/55 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#f1e8ff] blur-3xl"
          />

          <div className="container-page relative z-10 grid min-h-[620px] items-center gap-10 py-16 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 bg-brass-500" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass-700">
                  About OS Group
                </p>
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
                className="mt-5 max-w-2xl font-serif text-[clamp(3rem,6.2vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink-900"
              >
                Who <span className="text-[#9b70c9]">We Are.</span>
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease }}
                className="mt-6 max-w-xl text-base leading-7 text-ink-700 md:text-lg md:leading-8"
              >
                A growing group built around people, opportunity and responsible
                progress — connecting expertise across industries and markets.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3, ease }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="#our-story"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brass-500 px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(200,146,22,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
                >
                  Explore our story
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a
                  href="#our-values"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#d8cce9] bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b993e6] hover:text-[#7c55a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b70c9] focus-visible:ring-offset-2"
                >
                  What guides us
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 34, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="relative"
            >
              <div className="absolute -left-5 -top-5 z-20 hidden h-20 w-20 rounded-2xl border border-[#d9c9ef] bg-white/90 shadow-[0_10px_28px_rgba(82,58,128,0.08)] sm:block" />
              <div className="absolute -bottom-5 -right-5 z-20 hidden h-24 w-24 rounded-full border border-[#d9c9ef] bg-[#f1e8ff]/80 sm:block" />

              <div className="relative z-10 aspect-[1.12/1] overflow-hidden rounded-[28px] border border-[#ddd1ed] bg-white p-2 shadow-[0_22px_60px_rgba(82,58,128,0.12)] sm:p-3">
                <div className="relative h-full overflow-hidden rounded-[20px]">
                  <motion.img
                    src={images.office}
                    alt="OS Group office"
                    className="h-full w-full object-cover"
                    initial={reduceMotion ? false : { scale: 1.08 }}
                    animate={reduceMotion ? undefined : { scale: 1 }}
                    transition={{ duration: 1.2, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4d376b]/24 via-transparent to-[#f0ddff]/15" />

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.55, ease }}
                    className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/65 bg-white/92 p-4 shadow-[0_10px_30px_rgba(23,32,51,0.1)] backdrop-blur-sm sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[290px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee4fb] text-[#805aa7]">
                        <Sparkles size={15} aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#805aa7]">
                        Our foundation
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-5 text-ink-800">
                      People, expertise and dependable execution.
                    </p>
                  </motion.div>
                </div>
              </div>

              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-3 top-12 z-20 h-14 w-14 rounded-full border border-[#cdb9e8] bg-[#f4edfd]"
                />
              )}
            </motion.div>
          </div>
        </section>

        <AboutSubNav />

        {/* STORY */}
        <section id="our-story" className="bg-white py-16 md:py-20 lg:py-24">
          <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                Our Story
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-ink-900 md:text-4xl lg:text-5xl">
                Built with purpose.
                <span className="block text-[#9b70c9]">Growing with people.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-ink-700">
                OS Group brings together businesses and people with a shared belief
                that sustainable growth comes from strong relationships, meaningful
                work and a commitment to doing things properly.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-600">
                From our foundations to the opportunities we pursue today, our focus
                remains simple: create value, develop people and build organisations
                that can grow for the long term.
              </p>
              <motion.div
                whileHover={reduceMotion ? undefined : { x: 5 }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink-800"
              >
                Discover our journey
                <ArrowUpRight size={16} className="text-brass-600" aria-hidden="true" />
              </motion.div>
            </Reveal>

            <div className="relative lg:col-span-7">
              <ImageFrame
                src={images.team}
                alt="OS Group team"
                className="aspect-[16/10]"
              />
              <Reveal
                direction="right"
                delay={0.15}
                className="absolute -bottom-6 -left-3 hidden w-[40%] sm:block md:-left-6"
              >
                <ImageFrame
                  src={images.leadership}
                  alt="OS Group leadership"
                  className="aspect-[4/3] border-4 border-white shadow-[0_12px_32px_rgba(82,58,128,0.12)]"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-[#e4dcef] bg-[#f7f3fc]">
          <div className="container-page grid grid-cols-2 divide-x divide-y divide-[#ded3ed] md:grid-cols-4 md:divide-y-0">
            {stats.map(([number, label], index) => (
              <Reveal key={label} delay={index * 0.06} className="min-w-0">
                <div className="px-5 py-8 md:px-7 md:py-10">
                  <p className="font-serif text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
                    {number}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#7c6a91]">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="relative overflow-hidden bg-[#f4effb] py-16 md:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute right-[-6rem] top-[-6rem] h-64 w-64 rounded-full border border-[#d7c5ed]"
          />
          <div
            aria-hidden="true"
            className="absolute right-[-2rem] top-[-2rem] h-48 w-48 rounded-full border border-[#e2d5f0]"
          />

          <div className="container-page relative z-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                Our Philosophy
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink-900 md:text-4xl lg:text-5xl">
                Strong businesses are built on{' '}
                <span className="text-[#9b70c9]">strong foundations.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 md:text-lg">
                We believe long-term success comes from combining commercial ambition
                with responsibility, people development and meaningful partnerships.
              </p>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-5">
              <div className="rounded-[24px] border border-[#ddd0ed] bg-white p-6 shadow-[0_12px_36px_rgba(82,58,128,0.07)] md:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eee4fb] text-[#805aa7]">
                    <Building2 size={18} aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold text-ink-900">What that means in practice</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {[
                    'Build relationships that last.',
                    'Develop capable and accountable teams.',
                    'Create value across the markets we serve.',
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: index * 0.08, ease }}
                      className="flex items-start gap-3 rounded-xl bg-[#faf8fe] px-4 py-3 text-sm font-medium leading-5 text-ink-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TODAY */}
        <section className="bg-white py-16 md:py-20 lg:py-24">
          <div className="container-page">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                Today
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-ink-900 md:text-4xl lg:text-5xl">
                A group moving{' '}
                <span className="text-[#9b70c9]">forward with intention.</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
              <Reveal direction="left" className="lg:col-span-7">
                <ImageFrame
                  src={images.leadership}
                  alt="OS Group leadership"
                  className="aspect-[16/9]"
                />
              </Reveal>

              <Reveal direction="right" className="lg:col-span-5">
                <Building2 size={30} strokeWidth={1.5} className="text-brass-600" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-ink-900 md:text-3xl">
                  Creating opportunities across sectors.
                </h3>
                <p className="mt-4 text-base leading-7 text-ink-700">
                  Our businesses continue to develop through collaboration, expertise
                  and a clear understanding of the markets and communities we serve.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#805aa7]">
                  <span className="h-px w-8 bg-[#b993e6]" />
                  Growing with intention
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.08} className="lg:col-span-4">
                <ImageFrame
                  src={images.project}
                  alt="OS Group project"
                  className="aspect-[4/3]"
                />
              </Reveal>

              <Reveal direction="right" delay={0.12} className="lg:col-span-8 lg:px-6">
                <p className="max-w-3xl font-serif text-2xl leading-relaxed text-ink-800 md:text-3xl">
                  “Our ambition is not simply to grow, but to grow in a way that creates lasting value.”
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* LOOKING AHEAD */}
        <section className="bg-[#faf8fe] py-16 md:py-20 lg:py-24">
          <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <Reveal direction="left" className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                Looking Ahead
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-ink-900 md:text-4xl lg:text-5xl">
                Local foundations.
                <span className="block text-[#9b70c9]">Global possibilities.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-ink-700">
                We continue to build from strong local foundations while creating
                opportunities to collaborate, expand and contribute across markets.
              </p>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-7">
              <ImageFrame
                src={images.global}
                alt="OS Group global presence"
                className="aspect-[16/9]"
              />
            </Reveal>
          </div>
        </section>

        {/* VALUES */}
        <section id="our-values" className="bg-white py-16 md:py-20 lg:py-24">
          <div className="container-page">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                What Guides Us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] text-ink-900 md:text-4xl lg:text-5xl">
                Our values.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">
                The principles that shape how we work, how we build relationships and how we move forward.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {values.map((value, index) => {
                const Icon = value.icon;
                const isActive = activeValue === index;

                return (
                  <motion.button
                    key={value.number}
                    type="button"
                    onClick={() => setActiveValue(index)}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className={`group relative overflow-hidden rounded-[22px] border p-6 text-left outline-none transition-all duration-300 md:p-7 ${
                      isActive
                        ? 'border-[#cbb5e6] bg-[#f3ebfb] shadow-[0_12px_34px_rgba(82,58,128,0.08)]'
                        : 'border-[#e4ddec] bg-white hover:border-[#d3c1e9] hover:bg-[#fbf9fe]'
                    } focus-visible:ring-2 focus-visible:ring-[#9b70c9] focus-visible:ring-offset-2`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                            isActive
                              ? 'bg-white text-[#805aa7]'
                              : 'bg-[#f4effa] text-[#9b70c9]'
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="text-xs font-bold tracking-[0.16em] text-[#805aa7]">
                          {value.number}
                        </span>
                      </div>

                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : { rotate: isActive ? 0 : -12 }
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                          isActive
                            ? 'border-[#c8afe5] bg-white text-[#805aa7]'
                            : 'border-[#e3d9ed] text-ink-400'
                        }`}
                      >
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </motion.span>
                    </div>

                    <h3 className="mt-7 font-serif text-2xl font-semibold text-ink-900 md:text-3xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-ink-700 md:text-base">
                      {value.text}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                      <motion.span
                        animate={{ width: isActive ? 52 : 18 }}
                        transition={{ duration: 0.35, ease }}
                        className="h-1 rounded-full bg-brass-500"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8c7a9f]">
                        {isActive ? 'Selected' : 'Explore'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="border-t border-[#e4ddec] bg-[#f3ecfb] py-14 md:py-18 lg:py-20">
          <div className="container-page">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-7 rounded-[26px] border border-[#d9c8ec] bg-white p-7 shadow-[0_12px_36px_rgba(82,58,128,0.06)] md:flex-row md:items-center md:p-9">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#805aa7]">
                    Explore OS Group
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-900 md:text-3xl">
                    See the companies and capabilities behind the group.
                  </h2>
                </div>

                <a
                  href="/companies"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-brass-500 px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(200,146,22,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
                >
                  Explore companies
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
