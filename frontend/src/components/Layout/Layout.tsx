import React, { useEffect } from 'react';
import { Box } from '@mui/joy';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types/user';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('User in Layout:', user);
  }, [user]);

  const showSidebar = user && (user.role === UserRole.ADMINISTRADOR || user.role === UserRole.VENDEDOR);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {showSidebar && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;