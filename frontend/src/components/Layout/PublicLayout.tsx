import React from 'react';
import { Box } from '@mui/joy';
import { Navbar } from "@/components";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1, pl: 3, pr: 3, pb: 3 }}>
      {children}
    </Box>
  </Box>
);

export default PublicLayout;