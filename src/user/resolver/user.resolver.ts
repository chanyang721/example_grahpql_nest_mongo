import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserType } from '../interfaces/type/user.type';
import { Public } from 'src/configuration/decorators/skip-auth.decorator';
@Resolver((of) => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserType])
  async findAll() {
    return this.userService.findAll();
  }

  // @Query((returns) => UserType)
  // async findOne(@Args('email') email: string) {
  //   return this.userService.findOne(email);
  // }

  // @Mutation((returns) => UserType)
  // async update(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
  //   return {};
  // }

  // @Mutation((returns) => UserType)
  // async remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
