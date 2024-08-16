import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../../application/services/authService';
import { UserRole } from '../../../../domain/entities/userRoles';
import { AppError } from '../middlewares/errorMiddleware';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
  };
}

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user.id, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      if (!token) {
        throw new AppError('Credenciales inválidas', 401);
      }
      res.json({ message: 'Login exitoso', token });
    } catch (error) {
      next(error);
    }
  }

  async changeUserRole(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { userId, newRole } = req.body;
      if (!req.user || !req.user.id) {
        throw new AppError('Usuario no autenticado', 401);
      }
      const adminId = req.user.id;
      const updatedUser = await this.authService.changeUserRole(userId, newRole as UserRole, adminId);
      if (!updatedUser) {
        throw new AppError('No se pudo actualizar el rol del usuario', 500);
      }
      res.json({ message: 'Rol de usuario actualizado', userId: updatedUser.id, newRole: updatedUser.role });
    } catch (error) {
      next(error);
    }
  }
}