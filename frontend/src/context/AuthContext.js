import { createContext, useState, useEffect, useCallback } from 'react';
import API from '../api/api';

export const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load user:', err?.response?.data || err.message || err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  };

  const register = async (payload) => {
    const res = await API.post('/auth/register', payload);
    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
