import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

const TYPE_LABEL = { full_time: 'Full-time', part_time: 'Part-time', contract: 'Contract', internship: 'Internship', remote: 'Remote' };

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/careers/jobs').then((res) => setJobs(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Careers" description="Build your career across a group of growing companies." />
      <PageHero eyebrow="Join Us" title="Careers at OS Group" description="Build your career across a group of growing companies." />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : jobs.length === 0 ? (
          <EmptyState title="No open positions right now" description="Check back soon, or send us your CV via the contact page." />
        ) : (
          <div className="divide-y divide-ink-100 border-t border-b border-ink-100">
            {jobs.map((j) => (
              <Link key={j._id} to={`/careers/${j.slug}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6 group">
                <div>
                  <h3 className="font-medium text-ink-900 group-hover:text-brass-500">{j.position}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-ash">
                    {j.department && <span className="flex items-center gap-1.5"><Briefcase size={14} />{j.department}</span>}
                    {j.location && <span className="flex items-center gap-1.5"><MapPin size={14} />{j.location}</span>}
                    <span className="flex items-center gap-1.5"><Clock size={14} />{TYPE_LABEL[j.employmentType]}</span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-brass-500 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}