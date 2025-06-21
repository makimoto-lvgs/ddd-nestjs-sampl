import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { UserModule } from './user.module';

@Module({
  imports: [
    // TypeORM設定
    TypeOrmModule.forRoot(typeOrmConfig),
    
    // GraphQL設定
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    
    // ユーザーモジュール
    UserModule,
  ],
})
export class AppModule {}
