import dotenv from 'dotenv';
import './database';
import { http } from './http';
import './websocket/client';
import './websocket/admin';

export default class Server {
  #port: any;
  constructor() {
    dotenv.config();
    this.#port = process.env.PORT || 3000;
  }

  start() {
    http.listen(this.#port, () =>
      console.log(`Server running on port ${this.#port}`),
    );
  }
}
