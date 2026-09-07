import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { useState as useReactState } from 'react';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

function FaqItem({ q, a }) {
  const [open, setOpen] = useReactState(false);
  return (
    <div className="border-b border-ink-100 py-4">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left gap-4">
        <span className="font-medium text-ink-900">{q}</span>
        <ChevronDown size={18} className={`text-ash transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-3 text-sm text-ash leading-relaxed">{a}</p>}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/services/slug/${slug}`).then((res) => setService(res.data.data)).catch(() => setService(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!service) return <EmptyState title="Service not found" />;

  return (
    <div>
      <SEO title={service.title} description={service.shortDescription} image={service.image} />
      <div className="bg-ink-900 text-white">
        <div className="container-page py-20 lg:py-24">
          <p className="text-brass-400 text-sm font-medium mb-3">{service.category?.name || 'Service'}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold max-w-2xl">{service.title}</h1>
          {service.shortDescription && <p className="mt-4 text-ink-200 max-w-xl">{service.shortDescription}</p>}
        </div>
      </div>

      <div className="container-page section grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 space-y-12">
          {service.description && (
            <p className="text-ink-700 leading-relaxed whitespace-pre-line">{service.description}</p>
          )}

          {service.benefits?.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-5">Why choose this service</h2>
              <ul className="space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex gap-3 text-ink-700">
                    <Check size={18} className="shrink-0 text-brass-500 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.process?.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-5">Our process</h2>
              <ol className="space-y-6">
                {service.process.map((p, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-serif text-2xl text-brass-400 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="font-medium text-ink-900">{p.step}</p>
                      <p className="text-sm text-ash mt-1">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {service.faqs?.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-3">Frequently asked questions</h2>
              {service.faqs.map((f, i) => <FaqItem key={i} q={f.question} a={f.answer} />)}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-ink-100 p-6">
            <h3 className="font-medium text-ink-900 mb-2">Interested in this service?</h3>
            <p className="text-sm text-ash mb-5">Reach out and our team will get back to you within one business day.</p>
            <Link to={service.ctaLink || '/contact'} className="btn-primary w-full justify-center">
              {service.ctaText || 'Get in Touch'} <ArrowRight size={16} />
            </Link>
          </div>
          {service.relatedCompanies?.length > 0 && (
            <div className="border border-ink-100 p-6">
              <h3 className="font-medium text-ink-900 mb-4">Offered by</h3>
              <div className="space-y-3">
                {service.relatedCompanies.map((c) => (
                  <Link key={c._id} to={`/companies/${c.slug}`} className="block text-sm text-ink-700 hover:text-brass-500">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
