import { Router } from 'express';
import MessageController from './controllers/MessageController';
import SettingController from './controllers/SettingController';
import UserController from './controllers/UserController';

export default class Routes {
  #routes: Router;
  constructor() {
    this.#routes = Router();
  }

  getRoutes(): Router {
    const settingController = new SettingController();
    const userController = new UserController();
    const messageController = new MessageController();
    this.#routes.post('/settings', settingController.create);
    this.#routes.get('/settings/:username', settingController.findByUsername);
    this.#routes.put('/settings/:username', settingController.update);
    this.#routes.post('/users', userController.create);
    this.#routes.post('/messages', messageController.create);
    this.#routes.get('/messages/:idUsuario', messageController.showByUser);

    return this.#routes;
  }
}
