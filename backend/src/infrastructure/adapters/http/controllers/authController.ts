import { Request, Response } from 'express';
import { AuthService } from '../../../../application/services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      if (token) {
        res.json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
    }
  }
}