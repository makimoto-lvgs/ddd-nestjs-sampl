import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from '../../application/services/user.service';
import { UserDto } from '../dto/user.dto';
import { CreateUserInput, UpdateUserInput } from '../dto/user-input.dto';
import { User } from '../../domain/entities/user';

/**
 * GraphQLリゾルバー：ユーザー
 *
 * プレゼンテーション層のコントローラーに相当
 * GraphQLクエリ・ミューテーションを処理
 */
@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * 全ユーザー取得
   */
  @Query(() => [UserDto])
  async users(): Promise<UserDto[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => this.toDto(user));
  }

  /**
   * ユーザー取得（ID指定）
   */
  @Query(() => UserDto, { nullable: true })
  async user(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserDto | null> {
    const user = await this.userService.getUser(id);
    return user ? this.toDto(user) : null;
  }

  /**
   * ユーザー作成
   */
  @Mutation(() => ID)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    return await this.userService.registerUser(input.name, input.email);
  }

  /**
   * ユーザー更新
   */
  @Mutation(() => UserDto)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserDto> {
    await this.userService.updateUser(id, input.name, input.email);
    const updatedUser = await this.userService.getUser(id);

    if (!updatedUser) {
      throw new Error('更新後のユーザーが見つかりません。');
    }

    return this.toDto(updatedUser);
  }

  /**
   * ユーザー削除
   */
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      await this.userService.deleteUser(id);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * ドメインオブジェクトからDTOへの変換
   */
  private toDto(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id.value;
    dto.name = user.name.value;
    dto.email = user.email.value;
    return dto;
  }
}
