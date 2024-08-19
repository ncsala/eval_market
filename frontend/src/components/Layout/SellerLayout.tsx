import React from 'react';
import { Box } from '@mui/joy';
import { Navbar, Sidebar } from "@/components";

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <Box sx={{ display: 'flex', flexGrow: 1, height: 'calc(100vh - 64px)' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  </Box>
);

export default SellerLayout;