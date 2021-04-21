import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  async create(req: Request, res: Response) {
    const { email } = req.body;
    const userService = new UserService();
    try {
      const savedData = await userService.create({ email });
      return res.status(201).json(savedData);
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }
}
