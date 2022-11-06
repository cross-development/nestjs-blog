// Core
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
// Interfaces and types
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly UserRepository: typeof User,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
  ) {}

  public async findOne(options?: object): Promise<User | null> {
    return await this.UserRepository.findOne<User>(options);
  }

  public async findById(id: number): Promise<User | null> {
    return await this.UserRepository.findById<User>(id);
  }

  public async create(user: User): Promise<User> {
    return await this.sequelizeInstance.transaction(async (transaction) => {
      return await this.UserRepository.create<User>(user, {
        returning: true,
        transaction,
      });
    });
  }

  public async update(id: number, newValue: IUser): Promise<User | null> {
    return await this.sequelizeInstance.transaction(async (transaction) => {
      let user = await this.UserRepository.findById<User>(id, { transaction });

      if (!user) {
        throw new HttpException(
          'The user was not found.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      user = this._assign(user, newValue);

      return await user.save({
        returning: true,
        transaction,
      });
    });
  }

  public async delete(id: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async (transaction) => {
      return await this.UserRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
