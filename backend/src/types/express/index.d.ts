import { User } from '../../domain/entities/user';
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}