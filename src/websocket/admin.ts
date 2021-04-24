import ConnectionService from '../services/ConnectionService';
import { io } from '../http';
import MessageService from '../services/MessageService';

io.on('connect', async (socket) => {
  const connectionService = new ConnectionService();
  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();
  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const messageService = new MessageService();
    const userMessages = await messageService.listByUser(params.user_id);
    callback(userMessages);
  });
  socket.on('admin_send_message', async (params) => {
    const { text, user_id } = params;
    const messageService = new MessageService();
    await messageService.create({
      text,
      userId: user_id,
      adminId: socket.id,
    });
    const { socketId } = await connectionService.findByUser(user_id);
    io.to(socketId).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });

  socket.on('admin_user_in_suport', async (params) => {
    const { user_id } = params;
    await connectionService.updateAdminId(user_id, socket.id);
  });
});
