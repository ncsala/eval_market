import { Request, Response, NextFunction } from "express";
import { UserRole, isValidRole } from "../../../../domain/entities/userRoles";
import { AppError } from "./errorMiddleware";

interface CustomRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
  };
}

export const validateRole = (
  req: Request,
  res: Response,
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
  return (req: CustomRequest , res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;

    if (!userRole || !isValidRole(userRole)) {
      throw new AppError("Rol de usuario no válido", 403);
    }

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("Acceso denegado para este rol", 403);
    }

    next();
  };
};
