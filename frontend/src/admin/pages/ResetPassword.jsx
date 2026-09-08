import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      await api.put(`/auth/reset-password/${token}`, { password });
      toast.success('Password reset — you are now signed in.');
      // Full reload (not react-router navigate) so AuthContext re-mounts and
      // fetches /auth/me with the fresh cookie the backend just set.
      window.location.href = '/admin';
    } catch (err) {
      toast.error(err.response?.data?.message || 'This reset link is invalid or has expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-semibold text-white">OS Group</h1>
          <p className="text-ink-300 text-sm mt-1">Choose a new password</p>
        </div>
        <form onSubmit={onSubmit} className="bg-white p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">New password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-ink-200 px-3 py-2.5 pr-10 text-sm focus:border-brass-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-400 hover:text-ink-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">Confirm new password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-ink-200 px-3 py-2.5 text-sm focus:border-brass-400 outline-none"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
            {submitting ? 'Resetting…' : 'Reset password'}
          </button>
          <Link to="/admin/login" className="block text-center text-xs text-ink-500 hover:text-ink-700">
            Back to sign in
          </Link>
          <p className="text-center text-xs text-ink-400">
            Link expired?{' '}
            <Link to="/admin/forgot-password" className="text-brass-600 hover:underline">
              Request a new one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}