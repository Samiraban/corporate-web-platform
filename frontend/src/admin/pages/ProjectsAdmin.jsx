import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const FIELDS = [
  { name: 'name', label: 'Project Name', required: true },
  { name: 'client', label: 'Client' },
  { name: 'category', label: 'Category' },
  { name: 'location', label: 'Location' },
{ name: 'coverImage', label: 'Cover Image', type: 'image' },  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { name: 'challenge', label: 'The Challenge', type: 'textarea', rows: 3 },
  { name: 'solution', label: 'Our Approach', type: 'textarea', rows: 3 },
  { name: 'results', label: 'The Results', type: 'textarea', rows: 3 },
  { name: 'startDate', label: 'Start Date', type: 'date' },
  { name: 'completionDate', label: 'Completion Date', type: 'date' },
  {
    name: 'status', label: 'Project Status', type: 'select', required: true,
    options: [{ value: 'upcoming', label: 'Upcoming' }, { value: 'ongoing', label: 'Ongoing' }, { value: 'completed', label: 'Completed' }],
  },
  {
    name: 'publishStatus', label: 'Visibility', type: 'select', required: true,
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }],
  },
  { name: 'isFeatured', label: 'Featured on Homepage', type: 'checkbox' },
];

export default function ProjectsAdmin() {
  return (
    <ResourceManager
      title="Projects"
      endpoint="/projects"
      fields={FIELDS}
      emptyItem={{ status: 'ongoing', publishStatus: 'draft' }}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'client', label: 'Client' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
        { key: 'publishStatus', label: 'Visibility', render: (i) => <StatusBadge status={i.publishStatus} /> },
      ]}
    />
  );
}
