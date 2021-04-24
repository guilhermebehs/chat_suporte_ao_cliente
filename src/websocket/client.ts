import ConnectionService from '../services/ConnectionService';
import UserService from '../services/UserService';
import { io } from '../http';
import MessageService from '../services/MessageService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();
  socket.on('client_first_access', async (params: IParams) => {
    const { email, text } = params;
    let user = await userService.findByEmail(email);
    if (!user) {
      user = await userService.create({ email });
      await connectionService.create({
        socketId: socket.id,
        userId: user.uuid,
      });
    } else {
      const connection = await connectionService.findByUser(user.uuid);
      if (!connection)
        await connectionService.create({
          socketId: socket.id,
          userId: user.uuid,
        });
      else {
        connection.socketId = socket.id;
        await connectionService.create(connection);
      }
    }
    await messageService.create({ text, userId: user.uuid });

    const allMessages = await messageService.listByUser(user.uuid);
    socket.emit('client_list_all_messages', allMessages);
    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;
    const { userId } = await connectionService.findBySocketId(socket.id);
    const message = await messageService.create({ text, userId });
    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socketId: socket.id,
    });
  });
});
