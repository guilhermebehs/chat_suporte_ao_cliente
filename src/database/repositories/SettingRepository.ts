import { EntityRepository, Repository } from 'typeorm';
import SettingEntity from '../entities/SettingEntity';

@EntityRepository(SettingEntity)
export default class SettingRepository extends Repository<SettingEntity> {}
