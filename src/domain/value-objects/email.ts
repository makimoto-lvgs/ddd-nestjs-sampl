/**
 * 値オブジェクト：メールアドレス
 *
 * メールアドレスの形式検証とドメインロジックを含む値オブジェクト
 */
export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('メールアドレスは必須です。');
    }

    if (!this.isValidEmail(value)) {
      throw new Error('正しいメールアドレスの形式ではありません。');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  /**
   * メールアドレスの形式チェック
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * ドメイン部分を取得
   */
  getDomain(): string {
    return this._value.split('@')[1];
  }

  /**
   * ローカル部分を取得
   */
  getLocalPart(): string {
    return this._value.split('@')[0];
  }

  /**
   * 等価性の判定
   */
  equals(other: Email): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
