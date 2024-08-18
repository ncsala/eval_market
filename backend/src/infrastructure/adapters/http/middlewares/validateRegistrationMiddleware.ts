import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorMiddleware';

export const validateRegistrationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(new AppError('Todos los campos son requeridos', 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError('Las contraseñas no coinciden', 400));
  }

  next();
};