import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { globalMiddleware } from './global';
import { swaggerMiddleware } from './swagger';
// import { webSocketLoader } from './web.socket';

export default async (app: NestFastifyApplication) => {
  await globalMiddleware(app);

  await swaggerMiddleware(app);

  // await webSocketLoader(app);
};
