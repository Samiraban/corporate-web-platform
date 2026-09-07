import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8, required: true },
{ name: 'coverImage', label: 'Cover Image', type: 'image' },  { name: 'tags', label: 'Tags (comma-separated)', hint: 'e.g. construction, safety, updates' },
  { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
  {
    name: 'status', label: 'Status', type: 'select', required: true,
    options: [
      { value: 'draft', label: 'Draft' }, { value: 'review', label: 'In Review' },
      { value: 'approved', label: 'Approved' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' },
    ],
  },
];

export default function BlogAdmin() {
  return (
    <ResourceManager
      title="Blog Posts"
      endpoint="/blogs"
      fields={FIELDS}
      emptyItem={{ status: 'draft' }}
      transformSubmit={(form) => ({
        ...form,
        tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags,
      })}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
      ]}
    />
  );
}
