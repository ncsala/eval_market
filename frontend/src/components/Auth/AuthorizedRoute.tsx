import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { LayoutWrapper } from "@/components";
import { AuthorizedRouteProps } from './types';

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ Element, allowedRoles, fallbackPath, isPublic }) => {
  const { user } = useAppSelector((state) => state.auth);

  console.log('User:', user);
  console.log('Allowed Roles:', allowedRoles);
  console.log('Is Public:', isPublic);
  
  if (isPublic || (user && allowedRoles && allowedRoles.includes(user.role))) {
    return (
      <LayoutWrapper>
        <Element />
      </LayoutWrapper>
    );
  }
  
  return <Navigate to={fallbackPath} />;
};

export default AuthorizedRoute;