import { EntityRepository, Repository } from 'typeorm';
import MessageEntity from '../entities/MessageEntity';

@EntityRepository(MessageEntity)
export default class MessageRepository extends Repository<MessageEntity> {}
