import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

const SECTION_LABEL = {
  companies: 'Companies', services: 'Services', industries: 'Industries', projects: 'Projects',
  blogs: 'Blog Posts', news: 'News', documents: 'Documents', careers: 'Careers', faqs: 'FAQs',
};
const SECTION_LINK = (type, item) => {
  switch (type) {
    case 'companies': return `/companies/${item.slug}`;
    case 'services': return `/services/${item.slug}`;
    case 'projects': return `/projects/${item.slug}`;
    case 'blogs': return `/blog/${item.slug}`;
    case 'news': return `/news/${item.slug}`;
    case 'careers': return `/careers/${item.slug}`;
    default: return '#';
  }
};

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSearch = async (e) => {
    e?.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setParams({ q });
    try {
      const res = await api.get(`/search?q=${encodeURIComponent(q)}`);
      setResults(res.data.results);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO title="Search" noindex />
      <PageHero eyebrow="Search" title="Search the OS Group site" />

      <div className="container-page section">
        <form onSubmit={runSearch} className="flex gap-3 max-w-xl mb-12">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search companies, services, projects, blog…"
            className="flex-1 border border-ink-200 px-4 py-3 text-sm focus:border-brass-400 outline-none"
          />
          <button type="submit" className="btn-primary"><SearchIcon size={16} /> Search</button>
        </form>

        {loading && <Loading />}

        {!loading && results && Object.values(results).every((r) => r.length === 0) && (
          <EmptyState title="No results found" description="Try a different search term." />
        )}

        {!loading && results && Object.entries(results).map(([type, items]) => items.length > 0 && (
          <div key={type} className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-ink-900 mb-4">{SECTION_LABEL[type] || type}</h3>
            <div className="divide-y divide-ink-100 border-t border-b border-ink-100">
              {items.map((item) => (
                <Link key={item._id} to={SECTION_LINK(type, item)} className="block py-3 text-ink-800 hover:text-brass-500">
                  {item.name || item.title || item.position || item.question}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}