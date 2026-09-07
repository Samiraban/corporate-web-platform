import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs?status=published&limit=50&sort=-publishedAt').then((res) => setPosts(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Blog" description="Perspectives, updates, and lessons from across the OS Group." />
      <PageHero eyebrow="Insights" title="Blog" description="Perspectives, updates, and lessons from across the OS Group." />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <EmptyState title="No posts yet" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <Link key={p._id} to={`/blog/${p.slug}`} className="group block">
                <div className="aspect-[4/3] bg-ink-100 overflow-hidden mb-4">
                  {p.coverImage && <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                {p.category?.name && <p className="text-xs text-brass-500 font-medium mb-2">{p.category.name}</p>}
                <h3 className="font-serif text-lg font-semibold text-ink-900 leading-snug">{p.title}</h3>
                <p className="text-sm text-ash mt-2 line-clamp-2">{p.excerpt}</p>
                <p className="text-xs text-ash mt-3">
                  {p.publishedAt && format(new Date(p.publishedAt), 'MMM d, yyyy')} · {p.readingTimeMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}