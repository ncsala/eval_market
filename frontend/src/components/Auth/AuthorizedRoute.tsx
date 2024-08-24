import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types";
import React from "react";

interface AuthorizedRouteProps {
  Element: React.ComponentType;
  allowedRoles?: UserRole[];
  fallbackPath: string;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  Element,
  allowedRoles = [],
  fallbackPath,
}) => {
  const { user, isInitialized } = useAppSelector((state) => ({
    user: state.auth.user,
    isInitialized: state.auth.isInitialized,
  }));

  if (!isInitialized) {
    // Mostrar un indicador de carga o nada mientras isInitialized es false
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Usuario no autenticado, redirigir a la ruta de fallback
    return <Navigate to={fallbackPath} />;
  }

  const userRole = user.role.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());

  if (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
    // Usuario autenticado pero sin permisos para esta ruta
    return <Navigate to={fallbackPath} />;
  }

  // Usuario tiene acceso a esta ruta
  return <Element />;
};

export default AuthorizedRoute;
