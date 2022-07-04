import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class JwtRefreshGraphqlStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const refresh = request?.headers?.refresh;
          console.log(
            'graphql refresh token',
            typeof request?.headers?.refresh,
          );
          console.log('graphql refresh token', request.cookies);
          return request?.cookies?.refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.cookies?.Refresh;
    console.log('validate refresh token graphql', req.headers);
    console.log(payload.id);
    // return this.userService.getUserIfRefreshTokenMatches(
    //   refreshToken,
    //   payload.id,
    // );
    return true;
  }
}
