import { UserRole } from '../../domain/entities/userRoles';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: UserRole;
      };
    }
  }
}

export {};