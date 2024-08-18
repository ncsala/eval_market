import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { BuyerLayout, SellerLayout, AdminLayout, PublicLayout } from '@/components';
import { UserRole } from '@/types/user';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <PublicLayout>{children}</PublicLayout>;

  switch (user.role) {
    case UserRole.COMPRADOR:
      return <BuyerLayout>{children}</BuyerLayout>;
    case UserRole.VENDEDOR:
      return <SellerLayout>{children}</SellerLayout>;
    case UserRole.ADMINISTRADOR:
      return <AdminLayout>{children}</AdminLayout>;
    default:
      return <PublicLayout>{children}</PublicLayout>;
  }
};

export default LayoutWrapper;