import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerMiddleware = async (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Attale Pro API Documents')
    .setDescription('Attale Pro API documents')
    .setVersion('1.0')
    .addCookieAuth('Authentication', {
      type: 'http',
      in: 'Header',
      scheme: 'bearer',
    })
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     description: 'accessToken',
    //     name: 'JWT',
    //     in: 'headers',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //   },
    //   'authorization',
    // )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
