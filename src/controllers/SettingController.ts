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

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settingService = new SettingService();
    try {
      const data = await settingService.findByUsername(username);
      return res.status(200).json(data);
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;
    const settingService = new SettingService();
    try {
      await settingService.update({ username, chat });
      return res.status(204).json();
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }
}
