import { Target, Eye, ShieldCheck } from 'lucide-react';
import { PageHero } from '../../components/UI';
import AboutSubNav from '../../components/AboutSubNav';
import { StaggerContainer, StaggerItem } from '../../components/anim/AnimatedSection';
import SEO from '../../components/SEO';

const VALUES = [
  {
    icon: Target,
    title: 'Mission',
    text: 'To deliver dependable, high-quality services across every industry we operate in.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'To be recognized as a group whose name alone signals quality and reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Values',
    text: 'Integrity, accountability, and long-term relationships over short-term gain.',
  },
];

export default function OurValues() {
  return (
    <div>
      <SEO title="Our Values" description="What guides every company under the OS Group name." />
      <PageHero
        eyebrow="About Us"
        title="Our Values"
        description="What guides every company under the OS Group name."
      />
      <AboutSubNav />

      <div className="container-page section">
        <StaggerContainer className="grid sm:grid-cols-3 gap-8">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <div className="text-center border border-ink-100 p-8 h-full">
                <v.icon className="mx-auto text-brass-500 mb-4" size={28} />
                <h3 className="font-medium text-ink-900 mb-2">{v.title}</h3>
                <p className="text-sm text-ash leading-relaxed">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}