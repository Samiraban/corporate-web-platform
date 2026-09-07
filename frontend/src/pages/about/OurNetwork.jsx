import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../../services/api';
import { PageHero, Loading, EmptyState } from '../../components/UI';
import AboutSubNav from '../../components/AboutSubNav';
import { StaggerContainer, StaggerItem } from '../../components/anim/AnimatedSection';
import SEO from '../../components/SEO';

export default function OurNetwork() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/companies?status=published&limit=100&sort=order')
      .then((res) => setCompanies(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Our Network" description="The companies that make up the OS Group of Company network." />
      <PageHero
        eyebrow="About Us"
        title="Our Network"
        description="The companies that make up OS Group of Company, each independent, each accountable to the same standard."
      />
      <AboutSubNav />

      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : companies.length === 0 ? (
          <EmptyState title="Companies coming soon" />
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((c) => (
              <StaggerItem key={c._id}>
                <Link
                  to={`/companies/${c.slug}`}
                  className="group block border border-ink-100 p-7 hover:border-brass-400 transition-colors h-full"
                >
                  {c.logo && <img src={c.logo} alt={c.name} className="h-10 mb-5 object-contain" />}
                  <h3 className="font-serif text-xl font-semibold text-ink-900">{c.name}</h3>
                  <p className="mt-2 text-sm text-ash line-clamp-2">{c.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brass-500 font-medium">
                    View company <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}