import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

/**
 * TypeORM設定
 *
 * データベース接続とエンティティの設定
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ddd_sample',
  entities: [UserEntity],
  synchronize: process.env.NODE_ENV !== 'production', // 本番環境ではfalseに
  logging: process.env.NODE_ENV === 'development',
};
