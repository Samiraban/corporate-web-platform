import { useEffect, useState } from 'react';
import { Heart, Users2, HandHeart, Sparkles } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading } from '../components/UI';
import { StaggerContainer, StaggerItem } from '../components/anim/AnimatedSection';
import AnimatedSection from '../components/anim/AnimatedSection';
import SEO from '../components/SEO';

const PILLARS = [
  { icon: Users2, title: 'One Team, Many Companies', text: 'Every employee across the group shares the same standard of care for clients and colleagues, regardless of which company they work for.' },
  { icon: HandHeart, title: 'Community First', text: 'OS Group companies invest time and resources back into the communities where they operate — not as an afterthought, but as part of how we do business.' },
  { icon: Sparkles, title: 'Room to Grow', text: 'People move between companies within the group as their careers develop, carrying what they\'ve learned into new challenges.' },
];

export default function TeamCulture() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials?limit=3').then((res) => setTestimonials(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SEO title="Culture" description="The people and values at the heart of OS Group of Company." />
      <PageHero
        eyebrow="Our People"
        title="The Heart of OS Group"
        description="Beyond the balance sheets and the buildings, OS Group is the people who show up every day to do the work properly."
      />

      <div className="container-page section">
        <StaggerContainer className="grid sm:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title}>
              <div className="text-center border border-ink-100 p-8 h-full">
                <p.icon className="mx-auto text-brass-500 mb-4" size={28} />
                <h3 className="font-medium text-ink-900 mb-2">{p.title}</h3>
                <p className="text-sm text-ash leading-relaxed">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {!loading && testimonials.length > 0 && (
        <div className="bg-ink-50 section">
          <div className="container-page">
            <AnimatedSection direction="up" className="max-w-2xl mb-14">
              <p className="eyebrow mb-3">In Their Words</p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900 flex items-center gap-3">
                <Heart size={28} className="text-brass-500" /> Voices from the group
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <StaggerItem key={t._id}>
                  <div className="border-l-2 border-brass-400 pl-6">
                    <p className="text-ink-800 leading-relaxed italic">"{t.testimonial}"</p>
                    <p className="mt-4 text-sm font-medium text-ink-900">{t.clientName}</p>
                    <p className="text-xs text-ash">{t.designation}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
}