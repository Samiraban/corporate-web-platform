import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MapPin, Clock, Briefcase, Calendar } from 'lucide-react';
import api from '../services/api';
import { Loading, EmptyState } from '../components/UI';
import SEO from '../components/SEO';

const TYPE_LABEL = { full_time: 'Full-time', part_time: 'Part-time', contract: 'Contract', internship: 'Internship', remote: 'Remote' };

export default function JobDetail() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    setLoading(true);
    api.get(`/careers/jobs/slug/${slug}`).then((res) => setJob(res.data.data)).catch(() => setJob(null)).finally(() => setLoading(false));
  }, [slug]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'cv') {
          formData.append('cv', value[0]);
        } else {
          formData.append(key, value);
        }
      });
      formData.append('job', job._id);
      await api.post('/careers/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success("Application submitted! We'll be in touch.");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!job) return <EmptyState title="This position is no longer available" />;

  return (
    <div>
      <SEO title={job.position} description={job.department ? `${job.position} — ${job.department}` : job.position} />
      <div className="bg-ink-900 text-white">
        <div className="container-page py-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold">{job.position}</h1>
          <div className="flex flex-wrap gap-5 mt-5 text-ink-200 text-sm">
            {job.department && <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.department}</span>}
            {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>}
            <span className="flex items-center gap-1.5"><Clock size={14} />{TYPE_LABEL[job.employmentType]}</span>
            {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={14} />Apply by {new Date(job.deadline).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      <div className="container-page section grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 space-y-8">
          {job.responsibilities?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-ink-700">{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
          {job.requirements?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-ink-700">{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
          {job.benefits?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-ink-700">{job.benefits.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
        </div>

        <aside className="border border-ink-100 p-6 h-fit">
          <h3 className="font-medium text-ink-900 mb-5">Apply for this position</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input {...register('name', { required: true })} placeholder="Full name" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
              {errors.name && <p className="text-xs text-red-600 mt-1">Name is required</p>}
            </div>
            <div>
              <input {...register('email', { required: true })} type="email" placeholder="Email address" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
              {errors.email && <p className="text-xs text-red-600 mt-1">Email is required</p>}
            </div>
            <div>
              <input {...register('phone', { required: true })} placeholder="Phone number" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
              {errors.phone && <p className="text-xs text-red-600 mt-1">Phone is required</p>}
            </div>
            <textarea {...register('coverLetter')} placeholder="Cover letter (optional)" rows={4} className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
            <div>
              <label className="block text-xs text-ash mb-1.5">CV / Resume (PDF or Word)</label>
              <input {...register('cv', { required: true })} type="file" accept=".pdf,.doc,.docx" className="w-full text-sm" />
              {errors.cv && <p className="text-xs text-red-600 mt-1">CV is required</p>}
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
