import {
  BadRequestException,
  InternalErrorException,
} from '../exceptions/HttpException';
import { getCustomRepository } from 'typeorm';
import ConnectionRepository from '../database/repositories/ConnectionRepository';
interface IConnectionCreate {
  uuid?: string;
  adminId?: string;
  userId: string;
  socketId: string;
}
export default class ConnectionService {
  #connectionRepository: ConnectionRepository;
  constructor() {
    this.#connectionRepository = getCustomRepository(ConnectionRepository);
  }
  async create({ uuid, adminId = null, socketId, userId }: IConnectionCreate) {
    if (!userId || !socketId)
      throw new BadRequestException('One or more required fields are empty!');

    try {
      const message = this.#connectionRepository.create({
        uuid,
        adminId,
        socketId,
        userId,
      });
      return await this.#connectionRepository.save(message);
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async findByUser(userId: string) {
    try {
      return await this.#connectionRepository.findOne({
        where: { userId },
        relations: ['user'],
      });
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async findBySocketId(socketId: string) {
    try {
      return await this.#connectionRepository.findOne({
        where: { socketId },
        relations: ['user'],
      });
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async findAllWithoutAdmin() {
    try {
      return await this.#connectionRepository.find({
        where: { adminId: null },
        relations: ['user'],
      });
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async updateAdminId(userId: string, adminId: string) {
    await this.#connectionRepository.update({ userId }, { adminId });
  }
}
