import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserService } from './application/services/user.service';
import { UserDuplicationCheckService } from './domain/services/user-duplication-check.service';
import { UserResolver } from './presentation/graphql/user.resolver';

/**
 * ユーザーモジュール
 *
 * ユーザー機能に関連するすべてのコンポーネントを統合
 * 依存性注入の設定を行う
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    // リポジトリ実装
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    
    // ドメインサービス
    UserDuplicationCheckService,
    
    // アプリケーションサービス
    UserService,
    
    // GraphQLリゾルバー
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
