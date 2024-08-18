import { UserRole } from './userRoles';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  password?: string; 
  createdAt?: Date;  
  updatedAt?: Date;
}