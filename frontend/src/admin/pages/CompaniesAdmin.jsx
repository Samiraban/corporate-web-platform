import ResourceManager from '../components/ResourceManager';
import StatusBadge from '../components/StatusBadge';

const FIELDS = [
  { name: 'name', label: 'Company Name', required: true },
  { name: 'tagline', label: 'Tagline' },
{ name: 'logo', label: 'Company Logo', type: 'image' },  { name: 'overview', label: 'Overview', type: 'textarea', rows: 4 },
  { name: 'history', label: 'History', type: 'textarea', rows: 3 },
  { name: 'establishedYear', label: 'Established Year', type: 'number' },
  { name: 'industryType', label: 'Industry Type' },
  { name: 'website', label: 'Website' },
  { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Phone' },
  { name: 'headquarters', label: 'Headquarters' },
  {
    name: 'status', label: 'Status', type: 'select', required: true,
    options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }],
  },
];

export default function CompaniesAdmin() {
  return (
    <ResourceManager
      title="Companies"
      endpoint="/companies"
      fields={FIELDS}
      emptyItem={{ status: 'draft' }}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'headquarters', label: 'HQ' },
        { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
      ]}
    />
  );
}
