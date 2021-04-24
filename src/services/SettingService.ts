import {
  BadRequestException,
  InternalErrorException,
} from './../exceptions/HttpException';
import { getCustomRepository } from 'typeorm';
import SettingRepository from '../database/repositories/SettingRepository';
interface ISettingCreate {
  username: string;
  chat: boolean;
}

interface ISettingUpdate {
  username?: string;
  chat?: boolean;
}
export default class SettingService {
  #settingRepository: SettingRepository;

  constructor() {
    this.#settingRepository = getCustomRepository(SettingRepository);
  }

  async create({ username, chat }: ISettingCreate) {
    if (!username || chat === undefined)
      throw new BadRequestException('One or more required fields are empty!');

    try {
      const userAlreadExists = await this.#settingRepository.findOne({
        username,
      });
      if (userAlreadExists) {
        throw new BadRequestException('User already exists!');
      }

      const settings = this.#settingRepository.create({
        username,
        chat,
      });
      return await this.#settingRepository.save(settings);
    } catch (e) {
      if (e instanceof BadRequestException)
        throw new BadRequestException(e.message);
      throw new InternalErrorException();
    }
  }

  async findByUsername(username: string) {
    try {
      const settings = await this.#settingRepository.findOne({ username });
      return settings;
    } catch (e) {
      throw new InternalErrorException();
    }
  }

  async update({ chat, username }: ISettingUpdate) {
    try {
      const settings = await this.#settingRepository.update(
        { username },
        { chat },
      );
      return settings;
    } catch (e) {
      throw new InternalErrorException();
    }
  }
}
