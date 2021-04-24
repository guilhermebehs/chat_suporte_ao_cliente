import { EntityRepository, Repository } from 'typeorm';
import ConnectionEntity from '../entities/ConnectionEntity';

@EntityRepository(ConnectionEntity)
export default class ConnectionRepository extends Repository<ConnectionEntity> {}
