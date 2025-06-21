import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user';
import { UserId } from '../../domain/value-objects/user-id';
import { UserName } from '../../domain/value-objects/user-name';
import { Email } from '../../domain/value-objects/email';
import { UserEntity } from '../database/entities/user.entity';

/**
 * リポジトリ実装：ユーザーリポジトリ
 *
 * ヘキサゴナルアーキテクチャのアダプターに相当
 * TypeORMを使用してデータ永続化を実装
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const userEntity = this.toEntity(user);
    await this.userEntityRepository.save(userEntity);
  }

  async findById(id: UserId): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { id: id.value },
    });

    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findByName(name: UserName): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { name: name.value },
    });

    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { email: email.value },
    });

    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userEntityRepository.find();
    return userEntities.map((entity) => this.toDomain(entity));
  }

  async delete(id: UserId): Promise<void> {
    await this.userEntityRepository.delete({ id: id.value });
  }

  async existsByName(name: UserName): Promise<boolean> {
    const count = await this.userEntityRepository.count({
      where: { name: name.value },
    });
    return count > 0;
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count = await this.userEntityRepository.count({
      where: { email: email.value },
    });
    return count > 0;
  }

  /**
   * ドメインオブジェクトからエンティティへの変換
   */
  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.name = user.name.value;
    entity.email = user.email.value;
    return entity;
  }

  /**
   * エンティティからドメインオブジェクトへの変換
   */
  private toDomain(entity: UserEntity): User {
    const id = new UserId(entity.id);
    const name = new UserName(entity.name);
    const email = new Email(entity.email);

    return User.restore(id, name, email);
  }
}
