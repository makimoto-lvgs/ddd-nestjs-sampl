import { UserId } from '../value-objects/user-id';
import { UserName } from '../value-objects/user-name';
import { Email } from '../value-objects/email';

/**
 * エンティティ：ユーザー
 *
 * 「ドメイン駆動設計入門」で解説されるエンティティの実装例
 * - 識別子を持つ（UserId）
 * - ライフサイクルがある
 * - 値オブジェクトを使用してドメインの不変条件を保つ
 */
export class User {
  private readonly _id: UserId;
  private _name: UserName;
  private _email: Email;

  constructor(id: UserId, name: UserName, email: Email) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  /**
   * ユーザー名を変更する
   * 値オブジェクトの交換可能性を利用
   */
  changeName(newName: UserName): void {
    this._name = newName;
  }

  /**
   * メールアドレスを変更する
   */
  changeEmail(newEmail: Email): void {
    this._email = newEmail;
  }

  /**
   * エンティティの等価性判定は識別子で行う
   */
  equals(other: User): boolean {
    if (!other) return false;
    return this._id.equals(other._id);
  }

  /**
   * ファクトリメソッド：新規ユーザー作成
   */
  static create(name: UserName, email: Email): User {
    const id = new UserId(); // 新しいIDを生成
    return new User(id, name, email);
  }

  /**
   * ファクトリメソッド：既存ユーザーの復元
   */
  static restore(id: UserId, name: UserName, email: Email): User {
    return new User(id, name, email);
  }
}
