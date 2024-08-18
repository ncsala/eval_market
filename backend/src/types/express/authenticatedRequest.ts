import { Request } from 'express-serve-static-core';
import { User } from '../../domain/entities/user';

export interface AuthenticatedRequest extends Request {
  user: User;
}