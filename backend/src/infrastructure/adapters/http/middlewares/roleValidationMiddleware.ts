import { Request, Response, NextFunction } from 'express';
import { UserRole, isValidRole } from '../../../../domain/entities/userRoles';
import { AppError } from './errorMiddleware';
import { User } from '../../../../domain/entities/user';

export const validateRole = (
  req: Request & { user?: Partial<User> },  
  next: NextFunction
) => {
  const { role } = req.body;

  if (!role) {
    throw new AppError("El rol es requerido", 400);
  }

  if (!isValidRole(role)) {
    throw new AppError("Rol inválido", 400);
  }

  next();
};

export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (
    req: Request & { user?: Partial<User> },  
    res: Response,
    next: NextFunction
  ) => {
    const userRole = req.user?.role;

    if (!userRole || !isValidRole(userRole)) {
      throw new AppError("Rol de usuario no válido", 403);
    }

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("Acceso denegado para este rol", 403);
    }

    next();
  };
};
