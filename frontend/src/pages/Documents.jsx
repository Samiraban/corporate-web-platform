import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import api from '../services/api';
import { PageHero, Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

const CATEGORY_LABEL = {
  registration: 'Registration', pan_vat: 'PAN / VAT', license: 'License', certificate: 'Certificate',
  award: 'Award', company_profile: 'Company Profile', brochure: 'Brochure', annual_report: 'Annual Report',
  policy: 'Policy', service_document: 'Service Document', project_document: 'Project Document',
  presentation: 'Presentation', other: 'Other',
};

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = category ? `&category=${category}` : '';
    api.get(`/documents?visibility=public&limit=100${query}`).then((res) => setDocs(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [category]);

  const handleDownload = async (doc) => {
    try {
      const res = await api.get(`/documents/${doc._id}/download`);
      window.open(res.data.url, '_blank');
    } catch {
      window.open(doc.file.url, '_blank');
    }
  };

  return (
    <div>
      <SEO title="Document Center" description="Company profiles, certificates, brochures and reports available for download." />
      <PageHero eyebrow="Resources" title="Document Center" description="Company profiles, certificates, brochures and reports available for download." />
      <div className="container-page section">
        <div className="flex gap-2 mb-10 flex-wrap">
          <button onClick={() => setCategory('')} className={`px-4 py-2 text-sm border ${!category ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>All</button>
          {Object.entries(CATEGORY_LABEL).map(([key, label]) => (
            <button key={key} onClick={() => setCategory(key)} className={`px-4 py-2 text-sm border ${category === key ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : docs.length === 0 ? (
          <EmptyState title="No documents in this category" />
        ) : (
          <div className="divide-y divide-ink-100 border-t border-b border-ink-100">
            {docs.map((d) => (
              <div key={d._id} className="flex items-center justify-between gap-4 py-5">
                <div className="flex items-center gap-4">
                  <FileText size={22} className="text-brass-500 shrink-0" />
                  <div>
                    <p className="font-medium text-ink-900">{d.title}</p>
                    <p className="text-xs text-ash mt-0.5">
                      {CATEGORY_LABEL[d.category]}{d.relatedCompany?.name ? ` · ${d.relatedCompany.name}` : ''}
                    </p>
                  </div>
                </div>
                <button onClick={() => handleDownload(d)} className="flex items-center gap-2 text-sm font-medium text-brass-500 hover:text-brass-600 shrink-0">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}