import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/projects/slug/${slug}`).then((res) => setProject(res.data.data)).catch(() => setProject(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!project) return <EmptyState title="Project not found" />;

  return (
    <div>
      <SEO title={project.name} description={project.description} image={project.coverImage} />
      <div className="aspect-[21/9] bg-ink-200">
        {project.coverImage && <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />}
      </div>

      <div className="container-page section grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink-900">{project.name}</h1>
            {project.description && <p className="mt-4 text-ink-700 leading-relaxed">{project.description}</p>}
          </div>

          {project.challenge && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">The Challenge</h2>
              <p className="text-ink-700 leading-relaxed">{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">Our Approach</h2>
              <p className="text-ink-700 leading-relaxed">{project.solution}</p>
            </div>
          )}
          {project.results && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">The Results</h2>
              <p className="text-ink-700 leading-relaxed">{project.results}</p>
            </div>
          )}

          {project.gallery?.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {project.gallery.map((g, i) => (
                <img key={i} src={g.url} alt={g.caption || ''} className="aspect-square object-cover w-full" />
              ))}
            </div>
          )}

          {project.testimonial?.quote && (
            <div className="border-l-2 border-brass-400 pl-6">
              <p className="text-ink-800 italic leading-relaxed">"{project.testimonial.quote}"</p>
              <p className="mt-3 text-sm font-medium text-ink-900">{project.testimonial.clientName}</p>
              <p className="text-xs text-ash">{project.testimonial.designation}</p>
            </div>
          )}
        </div>

        <aside className="border border-ink-100 p-6 h-fit space-y-4">
          <h3 className="font-medium text-ink-900 mb-2">Project Details</h3>
          {project.client && (
            <div className="flex gap-3 text-sm text-ash">
              <Building2 size={16} className="shrink-0 text-brass-500 mt-0.5" /> {project.client}
            </div>
          )}
          {project.location && (
            <div className="flex gap-3 text-sm text-ash">
              <MapPin size={16} className="shrink-0 text-brass-500 mt-0.5" /> {project.location}
            </div>
          )}
          {project.completionDate && (
            <div className="flex gap-3 text-sm text-ash">
              <Calendar size={16} className="shrink-0 text-brass-500 mt-0.5" />
              {new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </div>
          )}
          {project.company && (
            <div className="pt-3 border-t border-ink-100">
              <p className="text-xs text-ash mb-1">Delivered by</p>
              <Link to={`/companies/${project.company.slug}`} className="text-sm font-medium text-ink-900 hover:text-brass-500">
                {project.company.name}
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
