import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RequestTargetStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_ACCESS_TOKEN_SECRET',
    });
  }

  async validate(payload: any) {
    console.log('======= RequestTargetStrategy =======');
    console.log('payload :', payload);
    // return await this.userService.getById(payload.id);
    return { email: 'chanyang721@gmail.com' };
  }
}
