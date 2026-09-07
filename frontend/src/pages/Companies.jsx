import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

export default function Companies() {
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
      <SEO title="Our Companies" description="Meet the companies within the OS Group of Company portfolio." />
      <PageHero
        eyebrow="Group Companies"
        title="A portfolio of independent, purpose-built companies"
        description="Every subsidiary in the OS Group operates with its own leadership and expertise, united by shared standards."
      />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : companies.length === 0 ? (
          <EmptyState title="Companies coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((c) => (
              <Link
                key={c._id}
                to={`/companies/${c.slug}`}
                className="group border border-ink-100 p-7 hover:border-brass-400 transition-colors flex flex-col"
              >
                {c.logo && <img src={c.logo} alt={c.name} className="h-10 mb-5 object-contain" />}
                <h3 className="font-serif text-xl font-semibold text-ink-900">{c.name}</h3>
                <p className="mt-2 text-sm text-ash line-clamp-2 flex-1">{c.tagline || c.overview}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-brass-500 font-medium">
                  View company <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
