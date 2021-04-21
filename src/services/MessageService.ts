import {
  BadRequestException,
  InternalErrorException,
} from './../exceptions/HttpException';
import { getCustomRepository } from 'typeorm';
import MessageRepository from '../database/repositories/MessageRepository';
interface IMessageCreate {
  adminId?: string;
  userId: string;
  text: string;
}
export default class MessageService {
  #messageRepository: MessageRepository;
  constructor() {
    this.#messageRepository = getCustomRepository(MessageRepository);
  }
  async create({ adminId, text, userId }: IMessageCreate) {
    if (!userId || !text)
      throw new BadRequestException('One or more required fields are empty!');

    try {
      const message = this.#messageRepository.create({
        adminId,
        text,
        userId,
      });
      return await this.#messageRepository.save(message);
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async listByUser(userId: string) {
    try {
      return await this.#messageRepository.find({
        where: { userId },
        relations: ['user'],
      });
    } catch (e) {
      throw new InternalErrorException();
    }
  }
}
