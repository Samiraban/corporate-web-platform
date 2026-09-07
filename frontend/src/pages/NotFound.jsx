import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <SEO title="Page not found" noindex />
      <p className="font-serif text-6xl text-brass-500 font-semibold">404</p>
      <h1 className="mt-4 text-2xl font-serif font-semibold text-ink-900">Page not found</h1>
      <p className="mt-3 text-ash">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">Back to Home</Link>
    </div>
  );
}
