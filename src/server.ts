import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import Routes from './routes';
import './database';

export default class Server {
  #port: any;
  constructor() {
    dotenv.config();
    this.#port = process.env.PORT || 3000;
  }

  start() {
    const server = express();
    const routes = new Routes().getRoutes();
    server.use(json());
    server.use(routes);
    server.listen(this.#port, () =>
      console.log(`Server running on port ${this.#port}`),
    );
  }
}
