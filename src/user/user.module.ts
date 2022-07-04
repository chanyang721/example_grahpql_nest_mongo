import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { VisionService } from './service/vision.service';
import { VisionRepository } from './repository/vision.repository';
import { VisionController } from './controller/vision.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [{ name: UserEntity.name, schema: UserSchema }],
      'test',
    ),
  ],
  providers: [
    //? Service DI
    UserService,
    VisionService,
    //? Resolver DI
    UserResolver,
    //?Repository DI
    UserRepository,
    VisionRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
