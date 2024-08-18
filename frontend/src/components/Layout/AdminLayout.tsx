// AdminLayout.tsx
import React from 'react';
import { Box } from '@mui/joy';
import Navbar from '../Navbar/Navbar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {children}
    </Box>
  </Box>
);

export default AdminLayout;
