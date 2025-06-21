import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * TypeORMエンティティ：ユーザー
 *
 * データベースのテーブル構造を定義
 * ドメインエンティティとは異なる、永続化のためのエンティティ
 */
@Entity('users')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 20, unique: true })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;
}
