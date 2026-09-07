import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const FIELDS = [
  { name: 'title', label: 'Service Title', required: true },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea', rows: 2 },
  { name: 'description', label: 'Full Description', type: 'textarea', rows: 5 },
  { name: 'icon', label: 'Icon', type: 'image' },
{ name: 'image', label: 'Cover Image', type: 'image' },
  { name: 'ctaText', label: 'CTA Button Text' },
  { name: 'ctaLink', label: 'CTA Link' },
  {
    name: 'status', label: 'Status', type: 'select', required: true,
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }],
  },
];

export default function ServicesAdmin() {
  return (
    <ResourceManager
      title="Services"
      endpoint="/services"
      fields={FIELDS}
      emptyItem={{ status: 'draft' }}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
      ]}
    />
  );
}
