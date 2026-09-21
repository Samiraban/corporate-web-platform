import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Eye,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import SEO from '../../components/SEO';

const ease = [0.16, 1, 0.3, 1];

const revealUp = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease },
  },
};

const revealLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const revealRight = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const VALUES = [
  {
    number: '01',
    title: 'Mission',
    eyebrow: 'WHAT DRIVES US',
    icon: Target,
    image: '/images/values-mission.jpg',
    statement:
      'To deliver dependable, high-quality services across every industry we operate in.',
    description:
      'We bring people, expertise and responsible practices together to deliver services our clients can depend on.',
  },
  {
    number: '02',
    title: 'Vision',
    eyebrow: 'WHERE WE ARE GOING',
    icon: Eye,
    image: '/images/values-vision.jpg',
    statement:
      'To be recognised as a group whose name signals quality, reliability and trust.',
    description:
      'We are building a group that can grow internationally while maintaining the standards and relationships that define OS Group.',
  },
  {
    number: '03',
    title: 'Values',
    eyebrow: 'WHAT WE STAND FOR',
    icon: ShieldCheck,
    image: '/images/values-integrity.jpg',
    statement:
      'Integrity, accountability and long-term relationships over short-term gain.',
    description:
      'Our values shape the decisions we make, the way we work with people and the standard we expect across the group.',
  },
];

function ValueCard({ value, index, reducedMotion }) {
  const Icon = value.icon;

  return (
    <motion.article
      variants={reducedMotion ? undefined : index % 2 === 0 ? revealLeft : revealRight}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease }}
      className="group overflow-hidden rounded-[1.35rem] border border-lavender-200 bg-white shadow-[0_12px_40px_rgba(87,67,130,0.07)]"
    >
      <div className="relative aspect-[16/8.5] overflow-hidden bg-lavender-50">
        <motion.img
          src={value.image}
          alt={value.title}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={reducedMotion ? undefined : { scale: 1.045 }}
          transition={{ duration: 0.65, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-sm font-bold text-lavender-800 shadow-sm backdrop-blur-sm sm:left-6 sm:top-6">
          {value.number}
        </div>

        <motion.div
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-lavender-800 shadow-sm backdrop-blur-sm sm:right-6 sm:top-6"
          whileHover={reducedMotion ? undefined : { rotate: 8, scale: 1.06 }}
        >
          <Icon size={17} aria-hidden="true" />
        </motion.div>
      </div>

      <div className="p-6 sm:p-7 lg:p-8">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-lavender-600">
          <span className="h-px w-7 bg-lavender-300" />
          {value.eyebrow}
        </div>

        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink-900 sm:text-3xl">
          {value.title}
        </h3>

        <p className="mt-3 text-sm font-medium leading-6 text-ink-700 sm:text-[15px]">
          {value.statement}
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
          {value.description}
        </p>

        <div className="mt-6 flex items-center gap-2 border-t border-lavender-100 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-lavender-700">
          <Check size={14} aria-hidden="true" />
          OS Group principle
        </div>
      </div>
    </motion.article>
  );
}

export default function OurValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeValue = VALUES[activeIndex];
  const ActiveIcon = activeValue.icon;

  return (
    <main className="overflow-hidden bg-[#FCFBFF] text-ink-900">
      <SEO
        title="Our Values"
        description="The mission, vision and values that guide every company under the OS Group name."
      />

      {/* HERO - intentionally matched to the Services page */}
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
                <Sparkles size={13} aria-hidden="true" />
                Our principles
              </div>

              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.3rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink-900">
                Values built
                <br />
                <span className="text-lavender-600">around trust.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                The mission, vision and principles that guide our decisions, shape our relationships and set the standard across the OS Group network.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#values"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender-600 px-5 text-sm font-bold text-black shadow-[0_10px_24px_rgba(111,82,173,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Explore our values
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <Link
                  to="/about/who-we-are"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lavender-200 bg-white px-5 text-sm font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
                >
                  Who we are
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
                src="/images/values-vision.jpg"
                alt="OS Group values and vision"
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
                <p className="mt-1 font-serif text-xl font-semibold text-ink-900">Purpose. Direction. Principles.</p>
              </motion.div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lavender-600">What guides us</p>
                      <p className="mt-2 max-w-md font-serif text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                        Principles that turn values into action.
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

        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lavender-100/70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-lavender-100/50 blur-3xl" />
      </section>

      {/* INTRO */}
      <section className="bg-[#FCFBFF] py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">Our foundation</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                What guides us.
              </h2>
            </div>

            <div className="lg:max-w-2xl lg:justify-self-end">
              <p className="text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
                Our mission, vision and values give every company in the group a shared direction while allowing specialist teams to operate with focus and accountability.
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-lavender-200 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                  <Sparkles size={15} aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                  {VALUES.length} principles across the group
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="scroll-mt-24 bg-lavender-50/55 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <motion.div
            variants={reducedMotion ? undefined : revealUp}
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
            className="mb-10 flex flex-col gap-5 border-b border-lavender-200 pb-7 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lavender-600">Mission · Vision · Values</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">Our values.</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl font-semibold text-lavender-300">03</span>
              <span className="text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-ink-500">Core principles</span>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {VALUES.map((value, index) => (
              <ValueCard
                key={value.number}
                value={value}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE PRINCIPLE */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">Put into practice</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Principles
                <br />
                <span className="text-lavender-600">in action.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-ink-600 sm:text-base">
                Our principles are designed to be visible in the way we make decisions, work with people and deliver for clients.
              </p>

              <div className="mt-7 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {VALUES.map((value, index) => {
                  const Icon = value.icon;
                  const active = index === activeIndex;

                  return (
                    <button
                      key={value.number}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                        active
                          ? 'border-lavender-300 bg-lavender-50 text-lavender-800 shadow-sm'
                          : 'border-lavender-100 bg-white text-ink-600 hover:border-lavender-200 hover:bg-lavender-50/60'
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lavender-600 ring-1 ring-lavender-200">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-lavender-500">{value.number}</span>
                        <span className="mt-0.5 block text-sm font-bold">{value.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              key={activeValue.number}
              initial={reducedMotion ? false : { opacity: 0, x: 35 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease }}
              className="overflow-hidden rounded-[1.75rem] border border-lavender-200 bg-[#FCFBFF] shadow-[0_18px_55px_rgba(87,67,130,0.08)]"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[300px] overflow-hidden md:min-h-[410px]">
                  <motion.img
                    src={activeValue.image}
                    alt={activeValue.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reducedMotion ? false : { scale: 1.06 }}
                    animate={reducedMotion ? undefined : { scale: 1 }}
                    transition={{ duration: 0.9, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#30254a]/65 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-lavender-700 backdrop-blur-sm">
                    {activeValue.eyebrow}
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                  <div className="flex items-center gap-3 text-lavender-600">
                    <span className="font-serif text-4xl font-semibold text-lavender-300">{activeValue.number}</span>
                    <span className="h-px w-12 bg-lavender-200" />
                    <ActiveIcon size={19} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">
                    {activeValue.title}.
                  </h3>
                  <p className="mt-5 text-lg font-medium leading-8 text-ink-800">
                    {activeValue.statement}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
                    {activeValue.description}
                  </p>
                  <div className="mt-7 flex items-center gap-2 border-t border-lavender-200 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-lavender-700">
                    <Check size={14} aria-hidden="true" />
                    A shared OS Group standard
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW VALUES SHOW UP */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <motion.div
              variants={reducedMotion ? undefined : revealLeft}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">How we work</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-900 sm:text-5xl lg:text-6xl">
                Values you
                <br />
                <span className="text-lavender-600">can see.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-ink-600 sm:text-base">
                Strong values matter when they influence everyday behaviour. We use them to keep quality, accountability and relationships at the centre of our work.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { number: '01', title: 'Decide', text: 'Make responsible decisions with integrity and clear accountability.' },
                { number: '02', title: 'Collaborate', text: 'Build respectful relationships with clients, colleagues and partners.' },
                { number: '03', title: 'Deliver', text: 'Keep quality and reliability at the centre of every commitment.' },
              ].map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={reducedMotion ? false : { opacity: 0, y: 25 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: reducedMotion ? 0 : index * 0.1, ease }}
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  className="rounded-2xl border border-lavender-200 bg-[#FCFBFF] p-6 shadow-[0_8px_30px_rgba(87,67,130,0.045)]"
                >
                  <span className="font-serif text-3xl font-semibold text-lavender-500">{item.number}</span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-600">{item.text}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lavender-600">
                    <Check size={14} aria-hidden="true" />
                    Group standard
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-lavender-50 py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lavender-200/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-lavender-100 blur-3xl" />

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
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-lavender-600">Built on principle</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-5xl">
                  Shared values that <span className="text-lavender-600">move us forward.</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
                  Discover more about OS Group, our companies and the people behind our work.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-lavender-600 px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(111,82,173,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-lavender-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2"
              >
                Get in touch
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
