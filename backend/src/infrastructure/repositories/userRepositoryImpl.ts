import { UserRepository } from '../../domain/ports/repositories/userRepository';
import UserModel from '../models/user';
import { User } from '../../domain/entities/user';
import { UserRole } from '../../domain/entities/userRoles';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? this.mapToUser(user) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user ? this.mapToUser(user) : null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await UserModel.create(userData);
    return this.mapToUser(user);
  }

  async update(userData: User): Promise<User> {
    const user = await UserModel.findByPk(userData.id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.update(userData);
    return this.mapToUser(user);
  }

  private mapToUser(userModel: UserModel): User {
    return {
      id: userModel.id,
      email: userModel.email,
      password: userModel.password,
      role: userModel.role as UserRole,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    };
  }
}