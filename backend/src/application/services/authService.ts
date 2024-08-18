import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/ports/repositories/userRepository";
import { User } from "../../domain/entities/user";
import { AppError } from "../../infrastructure/adapters/http/middlewares/errorMiddleware";
import { UserRole } from "../../domain/entities/userRoles";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("El usuario ya existe", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.COMPRADOR,
    });

    if (!newUser) {
      throw new AppError("No se pudo crear el usuario", 500);
    }

    return newUser;
  }
  
  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Usuario o contraseña incorrectos.", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new AppError("Usuario o contraseña incorrectos.", 401);
    }

    return jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
  }

  async changeUserRole(
    userId: number,
    newRole: UserRole,
    adminId: number
  ): Promise<User | null> {
    const admin = await this.userRepository.findById(adminId);
    if (!admin || admin.role !== UserRole.ADMINISTRADOR) {
      throw new AppError("No tienes permisos para realizar esta acción", 403);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    user.role = newRole;
    return this.userRepository.update(user);
  }
}
