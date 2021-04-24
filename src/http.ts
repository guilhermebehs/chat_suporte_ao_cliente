import express from 'express';
import { json } from 'body-parser';
import Routes from './routes';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import path from 'path';
import ejs from 'ejs';

const server = express();
const http = createServer(server);
const io = new SocketServer(http);
const routes = new Routes().getRoutes();
server.use(json());
server.use(express.static(path.join(__dirname, '..', 'public')));
server.set('views', path.join(__dirname, '..', 'public'));
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.get('/pages/client', (req, res) => {
  res.render('html/client.html');
});
server.get('/pages/admin', (req, res) => {
  res.render('html/admin.html');
});
server.use(routes);
export { io, http };
