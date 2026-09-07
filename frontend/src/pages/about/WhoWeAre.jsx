import { PageHero } from '../../components/UI';
import AboutSubNav from '../../components/AboutSubNav';
import AnimatedSection from '../../components/anim/AnimatedSection';
import SEO from '../../components/SEO';

export default function WhoWeAre() {
  return (
    <div>
      <SEO title="Who We Are" description="A group built on trust, expanded through discipline." />
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        description="A group built on trust, expanded through discipline."
      />
      <AboutSubNav />

      <div className="container-page section max-w-3xl">
        <AnimatedSection direction="up">
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Our Story</h2>
          <p className="text-ink-700 leading-relaxed">
            OS Group of Company began as a single venture built on a simple idea: do the work
            properly, and the rest follows. What started as one company's pursuit of doing
            things right has, over the years, grown into a group of businesses spanning
            multiple industries.
          </p>
          <p className="mt-4 text-ink-700 leading-relaxed">
            Every subsidiary was added deliberately — not to chase size, but because it let us
            serve our clients and communities more completely. Today, OS Group operates across
            multiple sectors, sharing one standard of integrity across every company that
            carries the OS Group name.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1} className="mt-10">
          <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">Where We Stand Today</h2>
          <p className="text-ink-700 leading-relaxed">
            From a single company to a diversified group, OS Group now brings together
            subsidiaries across construction, trade, services and more — each operating
            independently in its field, sharing the group's values of integrity and quality.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}