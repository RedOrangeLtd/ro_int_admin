import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  roles: string[];
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await api.get<{ success: boolean; data: User }>('/profile');
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post<{
        success: boolean;
        data: { token: string; user: User }
      }>('/login', credentials, { auth: false });

      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      window.location.href = '/signin';
    }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      const response = await api.post<{ success: boolean; message: string }>('/profile-update', formData);
      if (response.success) {
        await fetchProfile();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    setLoading(true);
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
