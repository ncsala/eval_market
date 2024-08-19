import { describe, it, expect, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware, roleMiddleware } from '../../../src/infrastructure/adapters/http/middlewares/authMiddleware';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../src/domain/entities/userRoles';

jest.mock('jsonwebtoken');

describe('Auth Middlewares', () => {
  describe('authMiddleware', () => {
    it('should call next() if a valid token is provided', () => {
      const req: any = {
        header: jest.fn().mockReturnValue('Bearer validtoken'),
      } as unknown as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      (jwt.verify as jest.Mock).mockReturnValue({ userId: 1, role: UserRole.COMPRADOR });

      authMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toEqual({ id: 1, role: UserRole.COMPRADOR });
    });

    it('should return 401 if no token is provided', () => {
      const req = {
        header: jest.fn().mockReturnValue(null),
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn() as NextFunction;

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'No se proporcionó token de autenticación' });
    });
  });

  describe('roleMiddleware', () => {
    it('should call next() if the user has the required role', () => {
      const req = {
        user: { role: UserRole.VENDEDOR },
      } as unknown as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      const middleware = roleMiddleware([UserRole.VENDEDOR]);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if the user does not have the required role', () => {
      const req = {
        user: { role: UserRole.COMPRADOR },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const middleware = roleMiddleware([UserRole.VENDEDOR]);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Acceso denegado' });
    });
  });
});