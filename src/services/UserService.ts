import {
  BadRequestException,
  InternalErrorException,
} from './../exceptions/HttpException';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../database/repositories/UserRepository';
interface IUserCreate {
  email: string;
}
export default class UserService {
  #userRepository: UserRepository;

  constructor() {
    this.#userRepository = getCustomRepository(UserRepository);
  }

  async create({ email }: IUserCreate) {
    if (!email) throw new BadRequestException('Invalid email!');

    const emailAlreadExists = await this.#userRepository.findOne({ email });
    if (emailAlreadExists) {
      throw new BadRequestException('Email already exists!');
    }
    try {
      const user = this.#userRepository.create({ email });
      const savedData = await this.#userRepository.save(user);
      return savedData;
    } catch (e) {
      throw new InternalErrorException();
    }
  }
}
