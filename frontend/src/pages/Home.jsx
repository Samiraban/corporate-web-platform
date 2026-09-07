import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight, Building2, Users, Award, Briefcase } from 'lucide-react';
import api from '../services/api';
import { Loading } from '../components/UI';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/anim/AnimatedSection';
import AnimatedText from '../components/anim/AnimatedText';
import AnimatedCounter from '../components/anim/AnimatedCounter';
import MagneticButton from '../components/anim/MagneticButton';
import NepalFlag from '../components/anim/NepalFlag';
import GradientMesh from '../components/anim/GradientMesh';
import BusinessShowcase from '../components/BusinessShowcase';
import GlobeGraphic from '../components/anim/GlobeGraphic';
import SEO from '../components/SEO';

const STAT_CARDS = [
  { icon: Building2, label: 'Group Companies', value: 8, suffix: '+', color: 'text-brass-400' },
  { icon: Briefcase, label: 'Projects Delivered', value: 150, suffix: '+', color: 'text-amber-400' },
  { icon: Users, label: 'Team Members', value: 500, suffix: '+', color: 'text-brass-300' },
  { icon: Award, label: 'Years Combined', value: 20, suffix: '+', color: 'text-rose-300' },
];

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [heroVideo, setHeroVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/companies?limit=6&status=published'),
      api.get('/industries?limit=6&status=published&sort=order'),
      api.get('/projects?limit=3&publishStatus=published&isFeatured=true'),
      api.get('/testimonials?limit=3'),
      api.get('/news?limit=3&status=published&sort=-publishedAt'),
      api.get('/settings/general'),
    ])
      .then(([c, ind, p, t, n, settings]) => {
        setCompanies(c.data.data);
        setIndustries(ind.data.data);
        setProjects(p.data.data);
        setTestimonials(t.data.data);
        setNews(n.data.data);
        setHeroVideo(settings.data.data?.heroVideoUrl || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const showcaseItems = industries.slice(0, 5).map((ind, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: ind.name,
    description: ind.description || 'Learn more about how OS Group operates in this sector.',
    image: ind.image || ind.icon,
    to: '/industries',
  }));

  return (
    <div>
      <SEO title={undefined} description="OS Group of Company is a diversified group of companies delivering projects and services across multiple industries." />
      {/* Hero */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        {heroVideo ? (
          <>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-ink-900/70" />
          </>
        ) : (
<GradientMesh />
        )}

        <div className="container-page py-24 lg:py-36 grid lg:grid-cols-12 gap-10 items-end relative">
          <div className="lg:col-span-8">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <NepalFlag size={28} />
              <p className="text-brass-400 text-sm font-medium">A group of companies, one standard of trust</p>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.08] max-w-3xl">
              <AnimatedText
                as="span"
                text="Building across industries, delivering on every commitment."
                split="word"
                delay={0.3}
                staggerDelay={0.05}
                className="block"
              />
            </h1>

            <motion.p
              className="mt-6 text-ink-200 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              OS Group of Company brings together subsidiaries across construction, trade,
              services and more — each operating with the same discipline, and the same word.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <MagneticButton as={Link} to="/companies" className="btn-brass">
                Explore Our Companies <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/contact"
                className="border border-white/30 text-white px-6 py-3 text-sm font-medium hover:bg-white/10"
              >
                Talk to Us
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-4 grid grid-cols-2 gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {STAT_CARDS.map((s) => (
              <motion.div
                key={s.label}
                className="border border-white/15 p-5"
                whileHover={{ y: -4, borderColor: 'rgba(245,183,0,0.6)' }}
                transition={{ duration: 0.25 }}
              >
<s.icon size={20} className={`${s.color} mb-3`} />
                <div className="text-2xl font-serif font-semibold">
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1.6} />
                </div>
                <div className="text-xs text-ink-300 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-ink-500"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <>
        {/* Our Story */}
<section className="relative section overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center text-ink-900">
    <GlobeGraphic className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px]" />
  </div>
  <div className="container-page relative max-w-3xl">
    <AnimatedSection direction="up">
      <p className="eyebrow mb-3">Our Story</p>
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900 leading-tight">
        From one company to a growing group
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        OS Group of Company began as a single venture built on a simple idea: do the
        work properly, and the rest follows. Over the years, that reputation opened
        doors into new industries — each one added deliberately, not to chase size,
        but because it let us serve our clients and communities more completely.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Today the group operates across multiple sectors, sharing one standard of
        integrity across every company that carries the OS Group name.
      </p>
      <Link
        to="/about"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brass-500 hover:text-brass-600"
      >
        Read our full story <ArrowRight size={14} />
      </Link>
    </AnimatedSection>
  </div>
</section>
          {/* Business sectors — numbered hover showcase */}
          {showcaseItems.length > 0 && (
            <section className="section">
              <div className="container-page">
                <AnimatedSection direction="up" className="max-w-2xl mb-14">
                  <p className="eyebrow mb-3">Our Business</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900 leading-tight">
                    Sectors we operate across
                  </h2>
                </AnimatedSection>
                <AnimatedSection direction="scale" delay={0.1}>
                  <BusinessShowcase items={showcaseItems} />
                </AnimatedSection>
                <div className="mt-8">
                  <Link to="/industries" className="text-sm font-medium text-brass-500 hover:text-brass-600 inline-flex items-center gap-1">
                    See all industries <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Group companies */}
          {companies.length > 0 && (
            <section className="section bg-ink-50 relative">
              <div className="container-page">
                <AnimatedSection direction="up" className="max-w-2xl mb-14">
                  <p className="eyebrow mb-3">Our Group</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900 leading-tight">
                    Companies under the OS Group umbrella
                  </h2>
                  <p className="mt-4 text-ash leading-relaxed">
                    Each subsidiary operates independently in its field, sharing the group's values of integrity and quality.
                  </p>
                </AnimatedSection>

                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map((c) => (
                    <StaggerItem key={c._id}>
                      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                        <Link
                          to={`/companies/${c.slug}`}
                          className="group block bg-white border border-ink-100 p-7 hover:border-brass-400 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-300"
                        >
                          {c.logo && <img src={c.logo} alt={c.name} className="h-10 mb-5 object-contain" />}
                          <h3 className="font-serif text-xl font-semibold text-ink-900">{c.name}</h3>
                          <p className="mt-2 text-sm text-ash line-clamp-2">{c.tagline}</p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm text-brass-500 font-medium">
                            Learn more <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                          </span>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* Featured projects */}
          {projects.length > 0 && (
            <section className="section relative overflow-hidden">
              <div className="container-page relative">
                <AnimatedSection direction="up" className="max-w-2xl mb-14">
                  <p className="eyebrow mb-3">Portfolio</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900">Recent work across the group</h2>
                </AnimatedSection>
                <StaggerContainer className="grid md:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <StaggerItem key={p._id} direction="scale">
                      <Link to={`/projects/${p.slug}`} className="group block">
                        <div className="aspect-[4/3] bg-ink-200 overflow-hidden mb-4">
                          {p.coverImage && (
                            <motion.img
                              src={p.coverImage}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </div>
                        <h3 className="font-medium text-ink-900">{p.name}</h3>
                        <p className="text-sm text-ash mt-1">{p.client}</p>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <section className="section bg-ink-50">
              <div className="container-page">
                <AnimatedSection direction="up" className="max-w-2xl mb-14">
                  <p className="eyebrow mb-3">Client Voices</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900">What our clients say</h2>
                </AnimatedSection>
                <StaggerContainer className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                    <StaggerItem key={t._id}>
                      <motion.div
                        className="border-l-2 border-brass-400 pl-6"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-ink-800 leading-relaxed italic">"{t.testimonial}"</p>
                        <p className="mt-4 text-sm font-medium text-ink-900">{t.clientName}</p>
                        <p className="text-xs text-ash">{t.designation}{t.company ? `, ${t.company}` : ''}</p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* Major highlights — simple dated news list */}
          {news.length > 0 && (
            <section className="section">
              <div className="container-page max-w-3xl">
                <AnimatedSection direction="up" className="mb-10">
                  <p className="eyebrow mb-3">Newsroom</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900">Major highlights</h2>
                </AnimatedSection>
                <StaggerContainer className="divide-y divide-ink-100 border-t border-b border-ink-100">
                  {news.map((n) => (
                    <StaggerItem key={n._id}>
                      <Link to={`/news/${n.slug}`} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 group">
                        {n.publishedAt && (
                          <span className="text-xs text-ash shrink-0 sm:w-32">
                            {format(new Date(n.publishedAt), 'MMMM d, yyyy')}
                          </span>
                        )}
                        <span className="font-medium text-ink-900 group-hover:text-brass-500 transition-colors">
                          {n.title}
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* CTA */}
{/* CTA */}
<section className="relative bg-ink-900 text-white overflow-hidden">
  <GradientMesh />
            <AnimatedSection direction="scale" className="container-page py-20 text-center relative">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold max-w-xl mx-auto">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-ink-300 max-w-lg mx-auto">
                Tell us what you're building. Our team will connect you with the right company in the group.
              </p>
              <MagneticButton as={Link} to="/contact" className="btn-brass mt-8 inline-flex">
                Start a Conversation <ArrowRight size={16} />
              </MagneticButton>
            </AnimatedSection>
          </section>
        </>
      )}
    </div>
  );
}