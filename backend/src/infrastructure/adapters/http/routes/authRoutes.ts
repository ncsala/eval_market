import express from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../../../../application/services/authService';
import { UserRepositoryImpl } from '../../../repositories/userRepositoryImpl';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';
import { UserRole } from '../../../../domain/entities/userRoles';

const router = express.Router();
const userRepository = new UserRepositoryImpl();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.put('/change-role', authMiddleware, roleMiddleware([UserRole.ADMINISTRADOR]), (req, res, next) => authController.changeUserRole(req, res, next));

export default router;