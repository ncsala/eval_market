import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUser, logout } from '../../redux/slices/authSlice';
import { User, UserRole } from '@/types';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          dispatch(setUser(parsedUser));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
      setIsInitialized(true);
    };

    loadUser();
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized && user) {
      if (location.pathname === '/login') {
        switch (user.role) {
          case UserRole.ADMINISTRADOR:
            navigate('/admin');
            break;
          case UserRole.VENDEDOR:
            navigate('/vendedor');
            break;
          case UserRole.COMPRADOR:
          default:
            navigate('/');
            break;
        }
      }
    }
  }, [user, isInitialized, navigate, location.pathname]);

  if (!isInitialized) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;