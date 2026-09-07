import ResourceManager from '../components/ResourceManager';

const CONFIGS = {
  industries: {
    title: 'Industries',
    endpoint: '/industries',
    emptyItem: { status: 'published' },
    fields: [
      { name: 'name', label: 'Industry Name', required: true },
{ name: 'icon', label: 'Icon', type: 'image' },      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
    ],
    columns: [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }],
  },
  awards: {
    title: 'Awards & Achievements',
    endpoint: '/awards',
    emptyItem: {},
    fields: [
      { name: 'title', label: 'Award Title', required: true },
      { name: 'organization', label: 'Awarding Organization' },
      { name: 'year', label: 'Year', type: 'number' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
{ name: 'image', label: 'Image', type: 'image' },     ],
    columns: [{ key: 'title', label: 'Title' }, { key: 'organization', label: 'Organization' }, { key: 'year', label: 'Year' }],
  },
  partners: {
    title: 'Partners & Clients',
    endpoint: '/partners',
    emptyItem: { type: 'client' },
    fields: [
      { name: 'name', label: 'Name', required: true },
{ name: 'logo', label: 'Logo', type: 'image', required: true }, // partners

{ name: 'website', label: 'Website' },
      { name: 'type', label: 'Type', type: 'select', options: [{ value: 'client', label: 'Client' }, { value: 'partner', label: 'Partner' }] },
    ],
    columns: [{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }],
  },
  testimonials: {
    title: 'Testimonials',
    endpoint: '/testimonials',
    emptyItem: { rating: 5, isVisible: true },
    fields: [
      { name: 'clientName', label: 'Client Name', required: true },
      { name: 'designation', label: 'Designation' },
      { name: 'company', label: 'Company' },
{ name: 'photo', label: 'Photo', type: 'image' },       { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'testimonial', label: 'Testimonial', type: 'textarea', rows: 4, required: true },
      { name: 'isVisible', label: 'Visible on site', type: 'checkbox' },
    ],
    columns: [{ key: 'clientName', label: 'Client' }, { key: 'company', label: 'Company' }, { key: 'rating', label: 'Rating' }],
  },
  faqs: {
    title: 'FAQs',
    endpoint: '/faqs',
    emptyItem: { category: 'General', isPublished: true },
    fields: [
      { name: 'category', label: 'Category' },
      { name: 'question', label: 'Question', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', rows: 4, required: true },
      { name: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
    columns: [{ key: 'category', label: 'Category' }, { key: 'question', label: 'Question' }],
  },
  team: {
    title: 'Team & Leadership',
    endpoint: '/team',
    emptyItem: { isLeadership: true, status: 'published' },
    fields: [
      { name: 'name', label: 'Full Name', required: true },
      { name: 'designation', label: 'Designation', required: true },
      { name: 'photo', label: 'Photo URL' },
      { name: 'biography', label: 'Biography', type: 'textarea', rows: 4 },
      { name: 'isLeadership', label: 'Show on Leadership page', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
    ],
    columns: [{ key: 'name', label: 'Name' }, { key: 'designation', label: 'Designation' }],
  },
};

export default function SimpleModulesAdmin({ module }) {
  const config = CONFIGS[module];
  if (!config) return <p className="text-ash text-sm">Unknown module.</p>;

  return (
    <ResourceManager
      title={config.title}
      endpoint={config.endpoint}
      fields={config.fields}
      emptyItem={config.emptyItem}
      columns={config.columns}
    />
  );
}
