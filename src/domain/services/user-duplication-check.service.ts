import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/user-repository.interface';
import { User } from '../entities/user';
import { UserName } from '../value-objects/user-name';
import { Email } from '../value-objects/email';

/**
 * ドメインサービス：ユーザー重複チェックサービス
 *
 * エンティティや値オブジェクトに属さないドメインロジックを実装
 * 「ドメイン駆動設計入門」で解説される重複チェックの例
 */
@Injectable()
export class UserDuplicationCheckService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * ユーザーの重複をチェック
   * ユーザー名とメールアドレスの両方をチェック
   */
  async checkDuplication(user: User): Promise<void> {
    await this.checkNameDuplication(user.name);
    await this.checkEmailDuplication(user.email);
  }

  /**
   * ユーザー名の重複チェック
   */
  async checkNameDuplication(name: UserName): Promise<void> {
    const exists = await this.userRepository.existsByName(name);
    if (exists) {
      throw new Error(`ユーザー名「${name.value}」は既に使用されています。`);
    }
  }

  /**
   * メールアドレスの重複チェック
   */
  async checkEmailDuplication(email: Email): Promise<void> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new Error(
        `メールアドレス「${email.value}」は既に使用されています。`,
      );
    }
  }

  /**
   * ユーザー更新時の重複チェック
   * 自分自身以外との重複をチェック
   */
  async checkDuplicationForUpdate(user: User): Promise<void> {
    // ユーザー名の重複チェック（自分以外）
    const existingUserByName = await this.userRepository.findByName(user.name);
    if (existingUserByName && !existingUserByName.equals(user)) {
      throw new Error(
        `ユーザー名「${user.name.value}」は既に使用されています。`,
      );
    }

    // メールアドレスの重複チェック（自分以外）
    const existingUserByEmail = await this.userRepository.findByEmail(
      user.email,
    );
    if (existingUserByEmail && !existingUserByEmail.equals(user)) {
      throw new Error(
        `メールアドレス「${user.email.value}」は既に使用されています。`,
      );
    }
  }
}
