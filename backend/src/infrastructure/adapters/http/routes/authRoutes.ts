import express from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../../../../application/services/authService';
import { UserRepositoryImpl } from '../../../repositories/userRepositoryImpl';

const router = express.Router();
const userRepository = new UserRepositoryImpl();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;