import { PageHero } from '../../components/UI';
import AboutSubNav from '../../components/AboutSubNav';
import AnimatedSection from '../../components/anim/AnimatedSection';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO';

const PRINCIPLES = [
  'Each company operates with its own leadership and specialization.',
  'Group-wide standards for quality, ethics, and client care apply across every subsidiary.',
  'Decisions are made close to the work, by the people who understand it best.',
  'Accountability runs both ways — from the group to each company, and back.',
];

export default function HowWeWork() {
  return (
    <div>
      <SEO title="How We Work" description="How OS Group companies operate together, with shared standards and independent leadership." />
      <PageHero
        eyebrow="About Us"
        title="How We Work"
        description="Independence with accountability — the balance that lets OS Group grow without losing what made the first company trustworthy."
      />
      <AboutSubNav />

      <div className="container-page section max-w-3xl">
        <AnimatedSection direction="up">
          <p className="text-ink-700 leading-relaxed">
            Each company in the group operates with its own leadership and specialization,
            while sharing group-wide standards for quality, ethics, and client care. That
            balance — independence with accountability — is what lets OS Group grow without
            losing what made the first company trustworthy.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1} className="mt-10 space-y-4">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 size={20} className="text-brass-500 shrink-0 mt-0.5" />
              <p className="text-ink-700">{p}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </div>
  );
}