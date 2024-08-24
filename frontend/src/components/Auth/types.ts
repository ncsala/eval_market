import { UserRole } from "@/types";

export interface AuthorizedRouteProps {
  Element: React.ComponentType;
  allowedRoles?: UserRole[];
  fallbackPath: string;
  isPublic?: boolean;
}
