import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/anim/AnimatedSection';

const NLCITS_SLUG = 'nepal-living-connecting-it-solution-pvt-ltd';
const NLCITS_LOGO = '/images/nlcits-logo.png';

function mediaUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value) || value.startsWith('data:') || value.startsWith('/')) return value;
  return `/api/${value.replace(/^\/+/, '')}`;
}

function isNlcits(company, slug) {
  const name = company?.name || '';
  return slug === NLCITS_SLUG || /nepal\s+living.*connecting.*it\s+solution/i.test(name);
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  return (
    <AnimatedSection direction={direction} delay={delay} duration={0.65} distance={26} className={className}>
      {children}
    </AnimatedSection>
  );
}

export default function CompanyDetail() {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/companies/slug/${slug}`)
      .then((res) => setCompany(res.data.data))
      .catch(() => setCompany(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const nlcits = isNlcits(company, slug);
  const logo = nlcits ? NLCITS_LOGO : mediaUrl(company?.logo);
  const websiteUrl = nlcits ? 'https://nlcsitservice.com/' : company?.website;

  const gallery = useMemo(() => {
    return (company?.gallery || []).filter((item) => item?.url);
  }, [company]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!company) return <EmptyState title="Company not found" />;

  const title = nlcits ? 'Nepal Living Connecting IT Solution Pvt. Ltd' : company.name;
  const tagline = company.tagline || (nlcits ? 'Technology, connectivity and digital solutions.' : '');

  return (
    <div className="overflow-hidden bg-white text-ink-900">
      <SEO title={title} description={company.tagline} image={logo} />

      {/* Animated company hero */}
      <section className="relative isolate overflow-hidden border-b border-lavender-100 bg-gradient-to-br from-white via-lavender-50/55 to-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-lavender-200/35 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, 18, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-lavender-100/55 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute right-[12%] top-24 h-40 w-40 rounded-full border border-lavender-200/70" />
          <div className="absolute right-[15%] top-28 h-24 w-24 rounded-full border border-brass-300/50" />
        </div>

        <div className="container-page relative grid min-h-[570px] items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-lavender-700 shadow-sm backdrop-blur"
            >
              <Sparkles size={14} aria-hidden="true" />
              OS Group Company
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-lavender-200 bg-white p-4 shadow-[0_18px_50px_rgba(124,90,183,0.12)]"
            >
              {logo ? (
                <img src={logo} alt={`${title} logo`} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-3xl font-serif font-semibold text-lavender-700">OS</span>
              )}
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brass-600"
            >
              {company.industry || (nlcits ? 'IT Company' : 'Group Company')}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink-900 sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            >
              {title}
            </motion.h1>

            {tagline && (
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="mt-6 max-w-2xl text-base leading-7 text-ink-600 md:text-lg md:leading-8"
              >
                {tagline}
              </motion.p>
            )}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-primary group">
                Work with us
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary group"
                >
                  Visit website
                  <ExternalLink size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 35, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:justify-self-end"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-lavender-200 bg-white p-2 shadow-[0_30px_80px_rgba(124,90,183,0.14)]">
              <div className="rounded-[1.55rem] bg-gradient-to-br from-lavender-50 to-white p-8 md:p-10">
                <div className="flex items-center justify-between border-b border-lavender-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-lavender-700">Inside the group</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-brass-500 shadow-[0_0_0_6px_rgba(215,165,42,0.12)]" />
                </div>
                <div className="py-10">
                  <p className="text-5xl font-serif font-semibold tracking-tight text-ink-900">01</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-ink-600">
                    A company built to connect expertise, technology and opportunity through practical solutions.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-lavender-100 bg-white p-4">
                    <p className="text-xs uppercase tracking-wider text-ink-500">Focus</p>
                    <p className="mt-1 text-sm font-bold text-ink-900">Innovation</p>
                  </div>
                  <div className="rounded-2xl border border-lavender-100 bg-white p-4">
                    <p className="text-xs uppercase tracking-wider text-ink-500">Approach</p>
                    <p className="mt-1 text-sm font-bold text-ink-900">Solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-brass-200 bg-white text-brass-600 shadow-lg"
              animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <main className="min-w-0">
            {company.overview && (
              <Reveal>
                <section className="border-b border-ink-100 pb-12 md:pb-14">
                  <p className="eyebrow mb-3">01 · Overview</p>
                  <h2 className="max-w-2xl font-serif text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
                    What the company does
                  </h2>
                  <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-ink-600 md:text-lg">
                    {company.overview}
                  </p>
                </section>
              </Reveal>
            )}

            {company.history && (
              <Reveal direction="right" className="border-b border-ink-100 py-12 md:py-14">
                <p className="eyebrow mb-3">02 · Our story</p>
                <h2 className="max-w-2xl font-serif text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
                  Built with purpose
                </h2>
                <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-ink-600 md:text-lg">
                  {company.history}
                </p>
              </Reveal>
            )}

            {company.services?.length > 0 && (
              <Reveal className="border-b border-ink-100 py-12 md:py-14">
                <p className="eyebrow mb-3">03 · Capabilities</p>
                <h2 className="font-serif text-3xl font-semibold text-ink-900 md:text-4xl">Services</h2>
                <StaggerContainer className="mt-7 grid gap-3 sm:grid-cols-2" staggerDelay={0.08}>
                  {company.services.map((service) => (
                    <StaggerItem key={service._id}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="group flex min-h-[76px] items-center justify-between rounded-2xl border border-lavender-100 bg-lavender-50/35 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-300 hover:bg-white hover:shadow-[0_14px_36px_rgba(124,90,183,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500"
                      >
                        <span className="font-semibold text-ink-900">{service.title}</span>
                        <ArrowRight size={17} className="text-lavender-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Reveal>
            )}

            {gallery.length > 0 && (
              <Reveal className="py-12 md:py-14">
                <p className="eyebrow mb-3">04 · Gallery</p>
                <h2 className="font-serif text-3xl font-semibold text-ink-900 md:text-4xl">A closer look</h2>
                <StaggerContainer className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3" staggerDelay={0.07}>
                  {gallery.map((item, index) => (
                    <StaggerItem key={`${item.url}-${index}`}>
                      <motion.figure
                        whileHover={reduceMotion ? undefined : { y: -5 }}
                        className={`group relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                      >
                        <img
                          src={mediaUrl(item.url)}
                          alt={item.caption || title}
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.045] ${index === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink-900/70 to-transparent px-4 pb-4 pt-12 transition-transform duration-300 group-hover:translate-y-0">
                          <figcaption className="text-sm font-medium text-white">
                            {item.caption || title}
                          </figcaption>
                        </div>
                      </motion.figure>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Reveal>
            )}
          </main>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-[1.5rem] border border-lavender-200 bg-white shadow-[0_18px_55px_rgba(124,90,183,0.10)]">
                <div className="bg-lavender-50 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-lavender-700">Connect</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-900">Contact</h2>
                </div>

                <div className="space-y-5 p-6">
                  {company.headquarters && (
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-50 text-lavender-700">
                        <MapPin size={16} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Location</p>
                        <p className="mt-1 text-sm leading-6 text-ink-700">{company.headquarters}</p>
                      </div>
                    </div>
                  )}

                  {company.phone && (
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-50 text-lavender-700">
                        <Phone size={16} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Phone</p>
                        <a href={`tel:${company.phone}`} className="mt-1 block text-sm font-medium text-ink-700 hover:text-lavender-700">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.email && (
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-50 text-lavender-700">
                        <Mail size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Email</p>
                        <a href={`mailto:${company.email}`} className="mt-1 block break-words text-sm font-medium text-ink-700 hover:text-lavender-700">
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {websiteUrl && (
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-50 text-lavender-700">
                        <Globe size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Website</p>
                        <a href={websiteUrl} target="_blank" rel="noreferrer" className="mt-1 block break-all text-sm font-medium text-ink-700 hover:text-lavender-700">
                          {websiteUrl.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}

                  <Link to="/contact" className="btn-primary mt-2 w-full justify-center">
                    Contact this company
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {company.branches?.length > 0 && (
              <Reveal direction="left" delay={0.08} className="mt-5">
                <div className="rounded-[1.5rem] border border-ink-100 bg-ink-50/50 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-lavender-700">Locations</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-ink-900">Branches</h3>
                  <div className="mt-5 space-y-4">
                    {company.branches.map((branch, index) => (
                      <motion.div
                        key={index}
                        whileHover={reduceMotion ? undefined : { x: 4 }}
                        className="border-l-2 border-lavender-300 pl-4"
                      >
                        <p className="font-semibold text-ink-900">{branch.label}</p>
                        <p className="mt-1 text-sm leading-6 text-ink-600">{branch.address}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
