import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { configModuleOptions } from 'src/modules/configModuleOptions';
import { mongooseOptions } from 'src/modules/mongooseModuleOptions';
import loaders from '../../src/configuration/middlewares';

export async function createTestingModule() {
  const moduleBuilder = Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(configModuleOptions),
      MongooseModule.forRootAsync(
        mongooseOptions('Test'),
      ),
      AppModule,
    ],
  });

  const compiled = await moduleBuilder.compile();

  const app = compiled.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
    { logger: false },
  );

  await loaders(app);

  return await app.init();
}
