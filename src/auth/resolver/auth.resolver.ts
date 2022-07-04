import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/configuration/decorators/skip-auth.decorator';
import { CurrentUser } from 'src/configuration/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto';
import { IUser } from 'src/user/interfaces/interface/user.interface';
import { UserType } from 'src/user/interfaces/type/user.type';
import { UserService } from 'src/user/service/user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { TokenType } from '../dto/token.type';
import { JwtRefreshGraphqlGuard } from '../jwt/jwt-refresh-graphql.guard';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  
  @Public()
  @Mutation((returns) => UserType)
  async register(@Args('createUserDto') user: CreateUserDto): Promise<IUser> {
    return this.authService.register(user);
  }

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Mutation((returns) => TokenType)
  async login(@Args('loginData') loginData: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginData.email,
      loginData.password,
    );
    if (!user) throw new UnauthorizedException();

    const { accessToken, accessOption, refreshToken, refreshOption } =
      await this.authService.login(user);

    await this.userService.setCurrentRefreshToken(
      refreshToken,
      user._id.toString(),
    );

    return {
      accessToken: accessToken,
      accessOption: accessOption,
      refreshToken: refreshToken,
      refreshOption: refreshOption,
    };
  }

  @Public()
  @UseGuards(JwtRefreshGraphqlGuard)
  @Query(() => TokenType)
  async logOut(@CurrentUser() user: UserType) {
    await this.userService.setCurrentRefreshToken(null, user._id.toString());

    return {
      accessToken: '',
      accessOption: '',
      refreshToken: '',
      refreshOption: '',
    };
  }

  @Public()
  @UseGuards(JwtRefreshGraphqlGuard)
  @Query(() => TokenType)
  async refresh(@CurrentUser() user: UserType) {
    const { token: accessToken, ...accessOption } =
      await this.authService.getToken(
        { id: user._id.toString() },
        'ACCESS_TOKEN',
      );

    return {
      accessToken: accessToken,
      accessOption: accessOption,
    };
  }
}
