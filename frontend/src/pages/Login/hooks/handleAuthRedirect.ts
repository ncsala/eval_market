import { NavigateFunction } from 'react-router-dom';
import { User, UserRole } from '@/types/user';

export const handleAuthRedirect = (user: User, navigate: NavigateFunction) => {
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
};