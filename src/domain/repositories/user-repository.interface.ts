import { User } from '../entities/user';
import { UserId } from '../value-objects/user-id';
import { UserName } from '../value-objects/user-name';
import { Email } from '../value-objects/email';

/**
 * リポジトリインターフェース：ユーザーリポジトリ
 *
 * ヘキサゴナルアーキテクチャのポートに相当
 * ドメイン層でインターフェースを定義し、インフラ層で実装する
 */
export interface IUserRepository {
  /**
   * ユーザーを保存
   */
  save(user: User): Promise<void>;

  /**
   * IDでユーザーを検索
   */
  findById(id: UserId): Promise<User | null>;

  /**
   * ユーザー名でユーザーを検索
   */
  findByName(name: UserName): Promise<User | null>;

  /**
   * メールアドレスでユーザーを検索
   */
  findByEmail(email: Email): Promise<User | null>;

  /**
   * すべてのユーザーを取得
   */
  findAll(): Promise<User[]>;

  /**
   * ユーザーを削除
   */
  delete(id: UserId): Promise<void>;

  /**
   * ユーザー名の重複チェック
   */
  existsByName(name: UserName): Promise<boolean>;

  /**
   * メールアドレスの重複チェック
   */
  existsByEmail(email: Email): Promise<boolean>;
}
