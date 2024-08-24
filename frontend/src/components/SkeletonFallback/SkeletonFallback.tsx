import React from 'react';
import { Skeleton, Sheet } from '@mui/joy';

const SkeletonFallback: React.FC = () => {
  return (
    <Sheet sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Skeleton variant="text" sx={{ width: '70%', height: 32, mb: 2 }} />
      <Skeleton variant="rectangular" sx={{ width: '100%', height: 120, mb: 2 }} />
      <Skeleton variant="text" sx={{ width: '40%', height: 24, mb: 1 }} />
      <Skeleton variant="text" sx={{ width: '60%', height: 24, mb: 1 }} />
      <Skeleton variant="text" sx={{ width: '80%', height: 24, mb: 2 }} />
      <Skeleton variant="rectangular" sx={{ width: '100%', height: 200 }} />
    </Sheet>
  );
};

export default SkeletonFallback;