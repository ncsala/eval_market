import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { User, UserRole } from "@/types";
import { AuthorizedRouteProps, AuthStatus } from "./types";
import { SkeletonFallback } from "../SkeletonFallback";

const hasRequiredRole = (
  userRole: string,
  allowedRoles: UserRole[]
): boolean => {
  const normalizedUserRole = userRole.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());
  return normalizedAllowedRoles.includes(normalizedUserRole);
};

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  Element,
  allowedRoles = [],
  fallbackPath,
}) => {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  const getAuthStatus = (
    isInitialized: boolean,
    user: User | null
  ): AuthStatus => {
    if (!isInitialized) return AuthStatus.LOADING;
    if (user) return AuthStatus.AUTHENTICATED;
    return AuthStatus.UNAUTHENTICATED;
  };

  const authStatus = getAuthStatus(isInitialized, user);

  switch (authStatus) {
    case AuthStatus.LOADING:
      return <SkeletonFallback />;
    case AuthStatus.UNAUTHENTICATED:
      return <Navigate to={fallbackPath} />;
    case AuthStatus.AUTHENTICATED:
      if (
        user &&
        allowedRoles.length > 0 &&
        !hasRequiredRole(user.role, allowedRoles)
      ) {
        return <Navigate to={fallbackPath} />;
      }
      return <Element />;
  }
};

export default AuthorizedRoute;
