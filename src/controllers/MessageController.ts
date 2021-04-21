import { Request, Response } from 'express';
import MessageService from '../services/MessageService';

export default class MessageController {
  async create(req: Request, res: Response) {
    const { userId, adminId, text } = req.body;
    const messageService = new MessageService();
    try {
      const savedData = await messageService.create({ userId, adminId, text });
      return res.status(201).json(savedData);
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }

  async showByUser(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const messageService = new MessageService();
    try {
      const messages = await messageService.listByUser(idUsuario);
      return res.status(200).json(messages);
    } catch (e) {
      const message = e.message || 'Internal Error';
      const statusCode = e.statusCode || 500;
      return res.status(statusCode).json({ message });
    }
  }
}
