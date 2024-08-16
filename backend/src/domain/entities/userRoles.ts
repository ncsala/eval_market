export enum UserRole {
  COMPRADOR = 'comprador',
  VENDEDOR = 'vendedor',
  ADMINISTRADOR = 'administrador'
}

export const isValidRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};