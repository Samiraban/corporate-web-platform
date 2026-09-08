import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/auth/forgot-password', { email });
      // Backend always returns success here (even for unknown emails) so
      // this page can't be used to enumerate which addresses have accounts.
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-semibold text-white">OS Group</h1>
          <p className="text-ink-300 text-sm mt-1">Reset your password</p>
        </div>
        <div className="bg-white p-8">
          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-ink-700">
                If an account exists for <span className="font-medium">{email}</span>, we&apos;ve sent a link to
                reset the password. The link expires in 30 minutes.
              </p>
              <Link to="/admin/login" className="text-sm text-brass-600 hover:underline inline-block">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <p className="text-sm text-ink-600">
                Enter the email address on your admin account and we&apos;ll send you a link to reset your password.
              </p>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send reset link'}
              </button>
              <Link to="/admin/login" className="block text-center text-xs text-ink-500 hover:text-ink-700">
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}