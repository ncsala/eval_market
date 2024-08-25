import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper, LayoutWrapper, SkeletonFallback } from '@/components';
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <LayoutWrapper>
          <Suspense fallback={<SkeletonFallback />}>
            <AppRoutes />
          </Suspense>
        </LayoutWrapper>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;