/**
 * 値オブジェクト：ユーザーID
 *
 * エンティティの識別子として使用する値オブジェクト
 */
export class UserId {
  private readonly _value: string;

  constructor(value?: string) {
    if (value) {
      this._value = value;
    } else {
      // 新規作成時はUUIDを生成
      this._value = this.generateUuid();
    }
  }

  get value(): string {
    return this._value;
  }

  /**
   * 簡易UUID生成（実際のプロジェクトではuuidライブラリを使用推奨）
   */
  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 等価性の判定
   */
  equals(other: UserId): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
