import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserDuplicationCheckService } from '../../domain/services/user-duplication-check.service';
import { User } from '../../domain/entities/user';
import { UserId } from '../../domain/value-objects/user-id';
import { UserName } from '../../domain/value-objects/user-name';
import { Email } from '../../domain/value-objects/email';

/**
 * アプリケーションサービス：ユーザーサービス
 *
 * ユースケースの実装を行う
 * ドメインオブジェクトを組み合わせてビジネスロジックを実現
 */
@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly userDuplicationCheckService: UserDuplicationCheckService,
  ) {}

  /**
   * ユーザー登録
   */
  async registerUser(name: string, email: string): Promise<string> {
    // 値オブジェクトを作成
    const userName = new UserName(name);
    const userEmail = new Email(email);

    // ドメインサービスで重複チェック
    await this.userDuplicationCheckService.checkNameDuplication(userName);
    await this.userDuplicationCheckService.checkEmailDuplication(userEmail);

    // エンティティを作成
    const user = User.create(userName, userEmail);

    // リポジトリに保存
    await this.userRepository.save(user);

    return user.id.value;
  }

  /**
   * ユーザー更新
   */
  async updateUser(id: string, name?: string, email?: string): Promise<void> {
    const userId = new UserId(id);
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new Error('ユーザーが見つかりません。');
    }

    // 名前の更新
    if (name && name !== existingUser.name.value) {
      const newName = new UserName(name);
      existingUser.changeName(newName);
    }

    // メールアドレスの更新
    if (email && email !== existingUser.email.value) {
      const newEmail = new Email(email);
      existingUser.changeEmail(newEmail);
    }

    // 更新時の重複チェック
    await this.userDuplicationCheckService.checkDuplicationForUpdate(
      existingUser,
    );

    // 保存
    await this.userRepository.save(existingUser);
  }

  /**
   * ユーザー取得
   */
  async getUser(id: string): Promise<User | null> {
    const userId = new UserId(id);
    return await this.userRepository.findById(userId);
  }

  /**
   * 全ユーザー取得
   */
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  /**
   * ユーザー削除
   */
  async deleteUser(id: string): Promise<void> {
    const userId = new UserId(id);
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new Error('ユーザーが見つかりません。');
    }

    await this.userRepository.delete(userId);
  }
}
