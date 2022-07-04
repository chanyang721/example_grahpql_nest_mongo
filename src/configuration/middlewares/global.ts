import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../exceptionFilter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { MongoExceptionFilter } from '../exceptionFilter/mongo-exception.filter';
// import { LoggingInterceptor } from '../interceptors/logging.interceptor';

export const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  maxAge: 3600 * 5,
  credentials: true,
};

export const globalMiddleware = async (app: NestFastifyApplication) => {
  //? Global Middleware for NestJS fastify  //
  // await app.register(fastifyHelmet, {
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: [`'self'`],
  //       styleSrc: [
  //         `'self'`,
  //         `'unsafe-inline'`,
  //         'cdn.jsdelivr.net',
  //         'fonts.googleapis.com',
  //       ],
  //       fontSrc: [`'self'`, 'fonts.gstatic.com'],
  //       imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
  //     },
  //   },
  // });

  await app.register(fastifyCookie, {
    secret: app.get(ConfigService).get<string>('COOKIE_SECRET'),
  });

  //? Global Logging Interceptor //
  // process.env.NODE_ENV !== 'testing' && app.useGlobalInterceptors(new LoggingInterceptor())

  //? Global Middleware for API Prefix //
  // app.setGlobalPrefix(app.get(ConfigService).get<string>('PRE_FIX') || '');

  //? Global Validation Pipes //
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true, //*
  //     whitelist: true, //* DTO에 없는 Request Body 속성 제거
  //     forbidNonWhitelisted: true, //*
  //   }),
  // );

  //? Global Exception filters //
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
};
