import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthorizedRoute } from '@/components';
import { routes } from './routes';
import { RouteConfig } from '@/types/route';

const AppRoutes: React.FC = () => (
  <Routes>
    {routes.map((route: RouteConfig) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.isPublic ? (
            <route.element />
          ) : (
            <AuthorizedRoute
              Element={route.element}
              allowedRoles={route.roles}
              fallbackPath="/login"
            />
          )
        }
      />
    ))}
  </Routes>
);

export default AppRoutes;