import { AuthService } from '../../../src/application/services/authService';
import { UserRepository } from '../../../src/domain/ports/repositories/userRepository';
import { User } from '../../../src/domain/entities/user';
import { UserRole } from '../../../src/domain/entities/userRoles';
import { AppError } from '../../../src/infrastructure/adapters/http/middlewares/errorMiddleware';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock de UserRepository
const mockUserRepository: jest.Mocked<UserRepository> = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

// Mock de bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock de jwt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockUserRepository);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      mockUserRepository.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockResolvedValue({ id: 1, email, role: UserRole.COMPRADOR } as User);

      const result = await authService.register(email, password);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
        role: UserRole.COMPRADOR,
      });
      expect(result).toEqual({ id: 1, email, role: UserRole.COMPRADOR });
    });

    it('should throw an error if user already exists', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1 } as User);

      await expect(authService.register('existing@example.com', 'password123'))
        .rejects.toThrow(AppError);
    });

    it('should throw an error if user creation fails', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockUserRepository.create.mockResolvedValue(null as any);

      await expect(authService.register('test@example.com', 'password123'))
        .rejects.toThrow(AppError);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email, role: UserRole.COMPRADOR, password: 'hashedPassword' } as User;
      const token = 'jwt_token';

      mockUserRepository.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await authService.login(email, password);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(result).toBe(token);
    });

    it('should throw an error if user does not exist', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(authService.login('nonexistent@example.com', 'password123'))
        .rejects.toThrow(AppError);
    });

    it('should throw an error if password is incorrect', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1, password: 'hashedPassword' } as User);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongpassword'))
        .rejects.toThrow(AppError);
    });
  });

  describe('changeUserRole', () => {
    it('should change user role successfully', async () => {
      const userId = 2;
      const newRole = UserRole.VENDEDOR;
      const adminId = 1;

      const admin = { id: adminId, role: UserRole.ADMINISTRADOR } as User;
      const user = { id: userId, role: UserRole.COMPRADOR } as User;
      const updatedUser = { ...user, role: newRole };

      mockUserRepository.findById.mockResolvedValueOnce(admin);
      mockUserRepository.findById.mockResolvedValueOnce(user);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await authService.changeUserRole(userId, newRole, adminId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(adminId);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.update).toHaveBeenCalledWith(updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if admin is not found', async () => {
      mockUserRepository.findById.mockResolvedValueOnce(null);

      await expect(authService.changeUserRole(2, UserRole.VENDEDOR, 1))
        .rejects.toThrow(AppError);
    });

    it('should throw an error if admin does not have ADMINISTRADOR role', async () => {
      const admin = { id: 1, role: UserRole.VENDEDOR } as User;
      mockUserRepository.findById.mockResolvedValueOnce(admin);

      await expect(authService.changeUserRole(2, UserRole.VENDEDOR, 1))
        .rejects.toThrow(AppError);
    });

    it('should throw an error if user to update is not found', async () => {
      const admin = { id: 1, role: UserRole.ADMINISTRADOR } as User;
      mockUserRepository.findById.mockResolvedValueOnce(admin);
      mockUserRepository.findById.mockResolvedValueOnce(null);

      await expect(authService.changeUserRole(2, UserRole.VENDEDOR, 1))
        .rejects.toThrow(AppError);
    });
  });
});