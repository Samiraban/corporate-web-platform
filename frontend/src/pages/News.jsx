import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';
import { sanitizeHtml } from '../utils/sanitizeHtml';

const TYPE_LABEL = {
  announcement: 'Announcement', launch: 'Launch', project: 'Project',
  partnership: 'Partnership', event: 'Event', achievement: 'Achievement', press_release: 'Press Release',
};

export function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news?status=published&limit=50&sort=-publishedAt').then((res) => setItems(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="News" description="Launches, partnerships, and milestones from across the group." />
      <PageHero eyebrow="Newsroom" title="News & Announcements" description="Launches, partnerships, and milestones from across the group." />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <EmptyState title="No news yet" />
        ) : (
          <div className="divide-y divide-ink-100">
            {items.map((n) => (
              <Link key={n._id} to={`/news/${n.slug}`} className="flex flex-col sm:flex-row gap-6 py-7 group">
                {n.coverImage && (
                  <div className="sm:w-56 aspect-[4/3] shrink-0 bg-ink-100 overflow-hidden">
                    <img src={n.coverImage} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-brass-500 font-medium mb-2">{TYPE_LABEL[n.type]}</p>
                  <h3 className="font-serif text-xl font-semibold text-ink-900">{n.title}</h3>
                  <p className="text-sm text-ash mt-2 line-clamp-2">{n.excerpt}</p>
                  {n.publishedAt && <p className="text-xs text-ash mt-3">{format(new Date(n.publishedAt), 'MMM d, yyyy')}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/news/slug/${slug}`).then((res) => setItem(res.data.data)).catch(() => setItem(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!item) return <EmptyState title="Article not found" />;

  return (
    <article className="container-page section max-w-3xl">
      <SEO title={item.title} description={item.excerpt} image={item.coverImage} />
      <p className="text-brass-500 text-sm font-medium mb-3">{TYPE_LABEL[item.type]}</p>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink-900 leading-tight">{item.title}</h1>
      {item.publishedAt && <p className="text-sm text-ash mt-4">{format(new Date(item.publishedAt), 'MMMM d, yyyy')}</p>}
      {item.coverImage && <img src={item.coverImage} alt={item.title} className="w-full aspect-video object-cover mt-8" />}
      <div
        className="mt-10 text-ink-800 leading-relaxed [&>p]:mb-5"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
      />
      <div className="mt-10">
        <Link to="/news" className="text-sm font-medium text-brass-500 hover:text-brass-600">← Back to newsroom</Link>
      </div>
    </article>
  );
}