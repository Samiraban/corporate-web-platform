import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import AnimatedSection from '../components/anim/AnimatedSection';
import BusinessShowcase from '../components/BusinessShowcase';
import SEO from '../components/SEO';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/industries?status=published&limit=100&sort=order'),
      api.get('/companies?status=published&limit=100'),
    ])
      .then(([ind, c]) => {
        setIndustries(ind.data.data);
        setCompanies(c.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const showcaseItems = industries.map((ind, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: ind.name,
    description: ind.description || 'Learn more about how OS Group operates in this sector.',
    image: ind.image || ind.icon,
    to: `/companies`,
  }));

  return (
    <div>
      <SEO title="Industries" description="The sectors OS Group of Company operates across." />
      <PageHero
        eyebrow="Our Business"
        title="Sectors we operate across"
        description="OS Group companies work across a range of industries, each led by focused expertise and backed by group-wide standards."
      />

      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : showcaseItems.length === 0 ? (
          <EmptyState title="Industry pages coming soon" />
        ) : (
          <AnimatedSection direction="up">
            <BusinessShowcase items={showcaseItems} />
          </AnimatedSection>
        )}
      </div>

      {companies.length > 0 && (
        <div className="bg-ink-50 section">
          <div className="container-page">
            <AnimatedSection direction="up" className="max-w-2xl mb-14">
              <p className="eyebrow mb-3">Who Delivers It</p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900">
                Companies behind these sectors
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((c) => (
                <Link
                  key={c._id}
                  to={`/companies/${c.slug}`}
                  className="group bg-white block border border-ink-100 p-7 hover:border-brass-400 transition-colors"
                >
                  {c.logo && <img src={c.logo} alt={c.name} className="h-10 mb-5 object-contain" />}
                  <h3 className="font-serif text-xl font-semibold text-ink-900">{c.name}</h3>
                  <p className="mt-2 text-sm text-ash line-clamp-2">{c.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brass-500 font-medium">
                    View company <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}