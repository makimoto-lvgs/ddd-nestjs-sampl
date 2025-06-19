/**
 * 値オブジェクト：ユーザー名
 *
 * 「ドメイン駆動設計入門」で解説される値オブジェクトの実装例
 * - 不変性: 一度作成されたら変更できない
 * - 等価性: 値が同じであれば同じオブジェクトとして扱われる
 * - 交換可能性: 新しい値に置き換えることで変更を表現
 */
export class UserName {
  private readonly _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('ユーザー名は必須です。');
    }
    
    if (value.length < 3) {
      throw new Error('ユーザー名は3文字以上である必要があります。');
    }
    
    if (value.length > 20) {
      throw new Error('ユーザー名は20文字以下である必要があります。');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  /**
   * 等価性の判定
   * 値オブジェクトは値が同じであれば同じオブジェクトとして扱う
   */
  equals(other: UserName): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
