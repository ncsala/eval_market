import { UserRole } from "@/types";

export interface AuthWrapperProps {
  children: React.ReactNode;
}

export interface AuthorizedRouteProps {
  Element: React.ComponentType;
  allowedRoles?: UserRole[];
  fallbackPath: string;
  isPublic?: boolean;
}

export interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export interface RegisterFormInputs {
  Correo: string;
  Contraseña: string;
  "Confirmar contraseña": string;
}

export enum AuthStatus {
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED'
}

export interface AuthorizedRouteProps {
  Element: React.ComponentType;
  allowedRoles?: UserRole[];
  fallbackPath: string;
}

