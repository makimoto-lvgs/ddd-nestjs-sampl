import { ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * GraphQL出力DTO：ユーザー
 *
 * GraphQLレスポンスの形式を定義
 */
@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
