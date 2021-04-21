import { Request, Response } from 'express';
import SettingService from '../services/SettingService';

export default class SettingController {
  async create(req: Request, res: Response) {
    const { username, chat } = req.body;
    const settingService = new SettingService();
    try {
      const savedData = await settingService.create({ username, chat });
      return res.status(201).json(savedData);
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }
}
