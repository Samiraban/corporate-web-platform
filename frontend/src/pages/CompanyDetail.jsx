import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

export default function CompanyDetail() {
  const { slug } = useParams();
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

  if (loading) return <Loading />;
  if (!company) return <EmptyState title="Company not found" />;

  return (
    <div>
      <SEO title={company.name} description={company.tagline} image={company.logo} />
      <div className="bg-ink-900 text-white">
        <div className="container-page py-20 lg:py-24">
          {company.logo && <img src={company.logo} alt={company.name} className="h-12 mb-6 object-contain" />}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold max-w-2xl">{company.name}</h1>
          {company.tagline && <p className="mt-4 text-ink-200 max-w-xl">{company.tagline}</p>}
        </div>
      </div>

      <div className="container-page section grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 space-y-10">
          {company.overview && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Overview</h2>
              <p className="text-ink-700 leading-relaxed whitespace-pre-line">{company.overview}</p>
            </div>
          )}
          {company.history && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Our History</h2>
              <p className="text-ink-700 leading-relaxed whitespace-pre-line">{company.history}</p>
            </div>
          )}
          {company.services?.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Services</h2>
              <div className="flex flex-wrap gap-3">
                {company.services.map((s) => (
                  <Link
                    key={s._id}
                    to={`/services/${s.slug}`}
                    className="px-4 py-2 border border-ink-200 text-sm text-ink-800 hover:border-brass-400 hover:text-brass-500"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {company.gallery?.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {company.gallery.map((g, i) => (
                  <img key={i} src={g.url} alt={g.caption || company.name} className="aspect-square object-cover w-full" />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-ink-100 p-6 space-y-4">
            <h3 className="font-medium text-ink-900">Contact</h3>
            {company.headquarters && (
              <div className="flex gap-3 text-sm text-ash">
                <MapPin size={16} className="shrink-0 text-brass-500 mt-0.5" />
                {company.headquarters}
              </div>
            )}
            {company.phone && (
              <div className="flex gap-3 text-sm text-ash">
                <Phone size={16} className="shrink-0 text-brass-500 mt-0.5" />
                {company.phone}
              </div>
            )}
            {company.email && (
              <div className="flex gap-3 text-sm text-ash">
                <Mail size={16} className="shrink-0 text-brass-500 mt-0.5" />
                {company.email}
              </div>
            )}
            {company.website && (
              <div className="flex gap-3 text-sm text-ash">
                <Globe size={16} className="shrink-0 text-brass-500 mt-0.5" />
                <a href={company.website} target="_blank" rel="noreferrer" className="hover:text-brass-500">
                  {company.website}
                </a>
              </div>
            )}
            <Link to="/contact" className="btn-primary w-full justify-center mt-2">
              Contact This Company <ArrowRight size={16} />
            </Link>
          </div>

          {company.branches?.length > 0 && (
            <div className="border border-ink-100 p-6">
              <h3 className="font-medium text-ink-900 mb-4">Branches</h3>
              <div className="space-y-4">
                {company.branches.map((b, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium text-ink-800">{b.label}</p>
                    <p className="text-ash">{b.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
