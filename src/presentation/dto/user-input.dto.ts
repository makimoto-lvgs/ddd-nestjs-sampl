import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

/**
 * GraphQL入力DTO：ユーザー作成
 */
@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'ユーザー名は必須です' })
  @Length(3, 20, {
    message: 'ユーザー名は3文字以上20文字以下で入力してください',
  })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  @IsEmail({}, { message: '正しいメールアドレスの形式で入力してください' })
  email: string;
}

/**
 * GraphQL入力DTO：ユーザー更新
 */
@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Length(3, 20, {
    message: 'ユーザー名は3文字以上20文字以下で入力してください',
  })
  name?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: '正しいメールアドレスの形式で入力してください' })
  email?: string;
}
