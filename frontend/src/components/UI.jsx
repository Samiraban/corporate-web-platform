export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-14`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink-900 leading-tight">
        {title}
      </h2>
      {description && <p className="mt-4 text-ash leading-relaxed">{description}</p>}
    </div>
  );
}

export function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-ink-200 border-t-brass-500 rounded-full animate-spin" />
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', description }) {
  return (
    <div className="text-center py-20">
      <h3 className="text-lg font-medium text-ink-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-ash">{description}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, description }) {
  return (
    <div className="bg-ink-900 text-white">
      <div className="container-page py-20 lg:py-28">
        {eyebrow && <p className="text-brass-400 text-sm font-medium mb-3">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl font-serif font-semibold max-w-3xl leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-ink-200 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
