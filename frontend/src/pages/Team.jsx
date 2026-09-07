import { useEffect, useState } from 'react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import { Linkedin, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/team?isLeadership=true&status=published&limit=100&sort=order').then((res) => setMembers(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Leadership" description="Meet the people guiding OS Group of Company and its subsidiaries." />
      <PageHero eyebrow="Our People" title="Leadership" description="The people guiding OS Group of Company and its subsidiaries." />
      <div className="container-page section">
        {loading ? (
          <Loading />
        ) : members.length === 0 ? (
          <EmptyState title="Leadership profiles coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((m) => (
              <div key={m._id}>
                <div className="aspect-square bg-ink-100 overflow-hidden mb-4">
                  {m.photo && <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="font-medium text-ink-900">{m.name}</h3>
                <p className="text-sm text-ash">{m.designation}</p>
                <div className="flex gap-3 mt-2">
                  {m.socialLinks?.linkedin && (
                    <a href={m.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-ash hover:text-brass-500">
                      <Linkedin size={15} />
                    </a>
                  )}
                  {m.socialLinks?.email && (
                    <a href={`mailto:${m.socialLinks.email}`} className="text-ash hover:text-brass-500">
                      <Mail size={15} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}