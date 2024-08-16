import { UserRepository } from '../../domain/ports/repositories/userRepository';
import User from '../models/user';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async create(userData: { email: string; password: string }): Promise<User> {
    return User.create(userData);
  }
}