import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  {
    name: 'type', label: 'Type', type: 'select', required: true,
    options: ['announcement', 'launch', 'project', 'partnership', 'event', 'achievement', 'press_release']
      .map((v) => ({ value: v, label: v.replace('_', ' ') })),
  },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8, required: true },
{ name: 'coverImage', label: 'Cover Image', type: 'image' },  { name: 'eventDate', label: 'Event Date', type: 'date' },
  {
    name: 'status', label: 'Status', type: 'select', required: true,
    options: [
      { value: 'draft', label: 'Draft' }, { value: 'review', label: 'In Review' },
      { value: 'approved', label: 'Approved' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' },
    ],
  },
];

export default function NewsAdmin() {
  return (
    <ResourceManager
      title="News & Announcements"
      endpoint="/news"
      fields={FIELDS}
      emptyItem={{ status: 'draft', type: 'announcement' }}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
      ]}
    />
  );
}
