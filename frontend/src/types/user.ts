export enum UserRole {
  COMPRADOR = 'comprador',
  VENDEDOR = 'vendedor',
  ADMINISTRADOR = 'administrador'
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  token: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}