const COLORS = {
  draft: 'bg-ink-100 text-ink-600',
  review: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  archived: 'bg-ink-100 text-ash',
  open: 'bg-green-100 text-green-700',
  closed: 'bg-ink-100 text-ash',
  completed: 'bg-green-100 text-green-700',
  ongoing: 'bg-blue-100 text-blue-700',
  upcoming: 'bg-yellow-100 text-yellow-700',
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  resolved: 'bg-green-100 text-green-700',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded capitalize ${COLORS[status] || 'bg-ink-100 text-ink-600'}`}>
      {status?.replace('_', ' ')}
    </span>
  );
}
