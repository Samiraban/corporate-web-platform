import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services?status=published&limit=100&sort=order')
      .then((res) => setServices(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Services" description="Explore the services offered across the OS Group of Company portfolio." />
      <PageHero
        eyebrow="What We Do"
        title="Services across the group"
        description="From construction to consulting, our companies offer specialized services backed by group-wide standards."
      />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : services.length === 0 ? (
          <EmptyState title="Services coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s._id} to={`/services/${s.slug}`} className="group border border-ink-100 p-7 hover:border-brass-400 transition-colors flex flex-col">
                {s.icon && <img src={s.icon} alt="" className="h-9 mb-5" />}
                <h3 className="font-serif text-xl font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm text-ash line-clamp-3 flex-1">{s.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-brass-500 font-medium">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
