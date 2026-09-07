import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// roles: optional array of allowed roles for this route. Super Admin
// always passes (mirrors backend authorize()). Omit to allow any
// logged-in admin/staff user.
export default function ProtectedRoute({ children, roles }) {
  const { user, loading, can } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ink-200 border-t-brass-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !can(...roles)) {
    toast.error("You don't have permission to view that page.");
    return <Navigate to="/admin" replace />;
  }

  return children;
}
