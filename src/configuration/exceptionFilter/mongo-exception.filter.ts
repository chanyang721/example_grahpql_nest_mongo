import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { FastifyReply } from 'fastify';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    if (exception?.code === 11000) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }
}
