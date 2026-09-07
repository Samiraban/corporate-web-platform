import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail } from 'lucide-react';
import api from '../services/api';
import { PageHero } from '../components/UI';
import SEO from '../components/SEO';

export default function Contact() {
  const [type, setType] = useState('contact');
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.post('/inquiries', { ...data, type });
      setReference(res.data.referenceNumber);
      toast.success('Message sent — thank you!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO title="Contact" description="Get in touch with OS Group of Company — general questions and business proposals welcome." />
      <PageHero eyebrow="Contact" title="Let's start a conversation" description="Whether it's a general question or a business proposal, we'd love to hear from you." />

      <div className="container-page section grid lg:grid-cols-3 gap-14">
        <div className="space-y-6">
          <div className="flex gap-3">
            <MapPin size={18} className="text-brass-500 shrink-0 mt-0.5" />
            <p className="text-ink-700 text-sm">Kathmandu, Nepal</p>
          </div>
          <div className="flex gap-3">
            <Phone size={18} className="text-brass-500 shrink-0 mt-0.5" />
            <p className="text-ink-700 text-sm">+977-1-XXXXXXX</p>
          </div>
          <div className="flex gap-3">
            <Mail size={18} className="text-brass-500 shrink-0 mt-0.5" />
            <p className="text-ink-700 text-sm">info@osgroup.com</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-8">
            <button onClick={() => setType('contact')} className={`px-5 py-2.5 text-sm border ${type === 'contact' ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>
              General Inquiry
            </button>
            <button onClick={() => setType('business')} className={`px-5 py-2.5 text-sm border ${type === 'business' ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-700'}`}>
              Business Inquiry
            </button>
          </div>

          {reference ? (
            <div className="border border-brass-300 bg-brass-50 p-6">
              <p className="font-medium text-ink-900">Thank you — your message has been received.</p>
              <p className="text-sm text-ash mt-2">Your reference number is <strong>{reference}</strong>. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
              <div>
                <input {...register('name', { required: true })} placeholder="Full name" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                {errors.name && <p className="text-xs text-red-600 mt-1">Name is required</p>}
              </div>
              <div>
                <input {...register('email', { required: true })} type="email" placeholder="Email address" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                {errors.email && <p className="text-xs text-red-600 mt-1">Email is required</p>}
              </div>
              <input {...register('phone')} placeholder="Phone number" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
              <input {...register('company')} placeholder="Company (optional)" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />

              {type === 'business' && (
                <>
                  <input {...register('industry')} placeholder="Industry" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                  <input {...register('requiredService')} placeholder="Service needed" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                  <input {...register('country')} placeholder="Country" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                  <input {...register('budget')} placeholder="Estimated budget" className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                </>
              )}

              <input {...register('subject')} placeholder="Subject" className="sm:col-span-2 w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
              <div className="sm:col-span-2">
                <textarea {...register('message', { required: true })} placeholder="Your message" rows={5} className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none" />
                {errors.message && <p className="text-xs text-red-600 mt-1">Message is required</p>}
              </div>
              <button type="submit" disabled={submitting} className="btn-primary sm:col-span-2 justify-center disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
