import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseOptions = (
  connectionName: string
): MongooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: connectionName,
  useFactory: (configService: ConfigService) => ({
    uri: process.env.NODE_ENV === 'test'
        ? configService.get<string>('TEST_MONGODB_URL')
        : configService.get<string>('MONGODB_URL'),
    retryAttempts: 2, //? 재시도 횟수
    retryDelay: 1000, //? 접속 재시도 간격
  }),
});
