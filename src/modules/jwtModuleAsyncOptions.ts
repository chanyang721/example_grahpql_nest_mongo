import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JwtModuleAsyncOptions,
  JwtModuleOptions,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),

    //* sign Option //
    signOptions: {
      expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      // algorithm: configService.get<string>('JWT_ALGORITHM'),
      // subject: 'ACCESS_TOKEN',
    } as JwtSignOptions,

    //* verify Options //
    verifyOptions: {
      expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      // algorithm: configService.get<string>('JWT_ALGORITHM'),
      // subject: 'ACCESS_TOKEN',
    } as JwtVerifyOptions,
  }),
};
