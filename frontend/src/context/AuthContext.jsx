import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLocation } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /*
     * Public pages do not need to ask the backend whether
     * the visitor is authenticated.
     *
     * Authentication is only required inside /admin.
     * This removes the unnecessary 401 request on every
     * public page.
     */
    const isAdminRoute =
      location.pathname === '/admin' ||
      location.pathname.startsWith('/admin/');

    if (!isAdminRoute) {
      setUser(null);
      setLoading(false);
      return;
    }

    let active = true;

    setLoading(true);

    api
      .get('/auth/me')
      .then((res) => {
        if (!active) return;

        setUser(res.data?.data || res.data?.user || null);
      })
      .catch(() => {
        if (!active) return;

        setUser(null);
      })
      .finally(() => {
        if (!active) return;

        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [location.pathname]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', {
      email,
      password,
    });

    const loggedInUser =
      res.data?.user ||
      res.data?.data ||
      null;

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const can = (...roles) => {
    if (!user) {
      return false;
    }

    if (user.role === 'super_admin') {
      return true;
    }

    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;