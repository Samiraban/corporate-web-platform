import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

const STATUS_LABEL = { completed: 'Completed', ongoing: 'Ongoing', upcoming: 'Upcoming' };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = status ? `&status=${status}` : '';
    api
      .get(`/projects?publishStatus=published&limit=100${query}`)
      .then((res) => setProjects(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  return (
    <div>
      <SEO title="Projects" description="Projects delivered across the OS Group of Company portfolio." />
      <PageHero
        eyebrow="Portfolio"
        title="Projects delivered across the group"
        description="A record of work completed, underway, and coming up across our subsidiaries."
      />
      <div className="container-page section">
        <div className="flex gap-2 mb-10 flex-wrap">
          {['', 'completed', 'ongoing', 'upcoming'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 text-sm border ${
                status === s ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700 hover:border-ink-400'
              }`}
            >
              {s ? STATUS_LABEL[s] : 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : projects.length === 0 ? (
          <EmptyState title="No projects to show" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <Link key={p._id} to={`/projects/${p.slug}`} className="group block">
                <div className="aspect-[4/3] bg-ink-100 overflow-hidden mb-4 relative">
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 text-ink-900 text-xs font-medium px-3 py-1">
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <h3 className="font-medium text-ink-900">{p.name}</h3>
                <p className="text-sm text-ash mt-1">{p.client}{p.location ? ` · ${p.location}` : ''}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}