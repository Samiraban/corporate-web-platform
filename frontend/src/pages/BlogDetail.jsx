import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';
import { sanitizeHtml } from '../utils/sanitizeHtml';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/slug/${slug}`).then((res) => setPost(res.data.data)).catch(() => setPost(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!post) return <EmptyState title="Post not found" />;

  return (
    <article className="container-page section max-w-3xl">
      <SEO title={post.title} description={post.excerpt || post.summary} image={post.coverImage} />
      {post.category?.name && <p className="text-brass-500 text-sm font-medium mb-3">{post.category.name}</p>}
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink-900 leading-tight">{post.title}</h1>
      <div className="flex items-center gap-3 mt-5 text-sm text-ash">
        {post.author?.name && <span>{post.author.name}</span>}
        {post.publishedAt && <span>· {format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>}
        {post.readingTimeMinutes && <span>· {post.readingTimeMinutes} min read</span>}
      </div>

      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full aspect-video object-cover mt-8" />
      )}

      <div
        className="prose-content mt-10 text-ink-800 leading-relaxed [&>p]:mb-5 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-ink-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
      />

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-ink-100">
          {post.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 bg-ink-50 text-ink-700">#{t}</span>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link to="/blog" className="text-sm font-medium text-brass-500 hover:text-brass-600">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
